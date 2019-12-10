# Building Endpoints

## Prior Knowledge

- Why it is useful to use more than one database when developing an API
- How to effectively use migrations in a `knex` project
- Knowledge of 400 range status codes

## Learning Objectives

- Learn how to use `mocha` hooks to execute functionality before each test
- Build controllers with best practices
- How to handle delete requests on rows referenced in other tables

## Creating endpoints with TDD

There is a lot of work to do in building an express server. There are several endpoints, middleware functions, error handlers and utils that will all need to be built.

In order to simplify this process we use TDD and add features to our server naturally. This way as we add more endpoints we can build on our existing functionality and not have to consider the system as a whole.

The first step is getting our database seeded, with any required migrations. Once we have that we can start to build a server. We take our first endpoint and start with the happy path.

This first endpoint will require a good amount of setup, we need our app, listen, controllers, models and a couple of routers for it to work. But once we have these things the work is done and can be built upon for subsequent tests. In this sense it is very front loaded. But once a lot of the boilerplate is done, it is much easier to carry on.

## Seeding before each test

So far we have been running a psql script before our tests in order to re-seed our database. This guarantees the state of our database at the start of our tests and allows us to write smaller isolated tests.

This comes with a couple of problems however. What happens when we start doing POST, PATCH or DELETE requests?

We are modifying the state of our test database. This means that the order we do our requests will matter, and in a long test suite it will become really hard to keep track of what data we actually have.

Now that our seed function also runs our migrations to drop and recreate the tables we aren't relying on a separate script to reseed.

To stop our tests hanging we using knex to end our connection.

As well as `describe` and `it` functions, [Mocha hooks](_https://mochajs.org/#hooks_) are made globally available when running a test suite with `mocha`. These hooks allow a function to be run at specific points during the test run. You may have seen the `after` hook before. It executes a function after all of the `it` blocks have finished running. It can be used to ensure the connection to the database is closed once the tests are over:

```js
const connection = require('../db/connection');

describe('/api', () => {
  after(() => connection.destroy());
  // tests...
});
```

Another mocha hook that will be useful is `beforeEach` which will execute a function **BEFORE** every `it` block. This allows the database to be re-seeded to ensure it contains exactly the same data before the start of every test.

```js
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  // tests...
});
```

**note** Seeding is an async process and returns a promise. In order for the beforeEach to wait for the seed to finish you must return the call to `seed.run`

Now we get the _same_ database state for each of our tests and we are free to test what we like without impacting other tests.

## Delete Requests

When responding to the client we send the current state of the resource with an appropriate status code. For example,

- GET - 200 Request processed ok, the body contains the requested resource.
- POST - 201 Resource created, the body contains the created resource.

However, there are many different error codes that correspond to different types of requests.

A 204 response indicates that the resource has been deleted and the server is responding with **no content**

This is appropriate as we have no longer have a record of that resource and we are sending the client the updated state, i.e. non-existent.

As there is no body, no more assertions are required. The status code is enough.

```js
it('status:204 no content for successful deletion', () => {
  return request.delete('/api/houses/5').expect(204);
});
```

## Deleting Foreign Keys

When we perform a delete operation on an sql row, the delete must still pass the schema constraints. But what happens if deleting that row would cause problems in other tables? Such as if that row is referenced by other tables?

When [creating the table](https://knexjs.org/#Schema-foreign) we can specify this behaviour. PSQL gives us some constraint options such as:

1. NO ACTION (default)
2. RESTRICT
3. CASCADE
4. SET NULL
5. SET DEFAULT

---

1. If we don't specify what to do on delete psql will take `NO ACTION` and throw an error.
2. `RESTRICT` has no practical difference to `NO ACTION`. It will make the same check but earlier in the transaction which will make no difference to us.
3. `CASCADE` will also delete any rows in the specified table that reference the row to be deleted.
4. `SET NULL` will set the foreign key to NULL in order to preserve the rest of the row and allow the deletion.
5. `SET DEFAULT` will attempt to set the foreign key to the default value. The default must pass the foreign key constraint or an error will be raised.

Which option you use depends on your data and how you would like to handle the result. The appropriate command can be applied to the table in our migrations.

```js
wizardsTable
  .integer('house_id')
  .references('houses.house_id')
  .onDelete('CASCADE');
```

Just as we tested our joins independently, we should also test this functionality to make sure that it works. As we now know the state of our database each time we can attempt to delete a row that is referenced in other tables.

```js
it('status:204 can delete houses referenced by other tables', () => {
  return request.delete('/api/houses/1').expect(204);
});
```
