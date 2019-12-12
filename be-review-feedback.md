## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### PATCH `/api/topics`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


### GET `/api/articles?order=asc`

Assertion: expected 'Living in the shadow of a great man' to equal 'Moustache'

Hints:
- accept an `order` query of `asc` or `desc`


### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:
- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client


### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


### PUT `/api/articles/1`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


### PATCH `/api/articles/1`

Assertion: expected 101 to equal 100

Hints:
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1


### GET `/api/articles/1/comments?order=asc`

Assertion: expected 2 to equal 18

Hints:
- accept an `order` query of `asc` or `desc`
- `sort_by` should default to `created_at`


### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:
- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client


### PUT `/api/articles/1/comments`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


### POST `/api/articles/1/comments`

Assertion: expected 200 to equal 201

Hints:
- use a 201: Created status code for a successful `POST` request


### PATCH `/api/comments/1`

Assertion: expected 400 to equal 200

Hints:
- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body


### PUT `/api/comments/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### DELETE `/api/comments/1`

Assertion: expected 200 to equal 204

Hints:
- use a 204: No Content status code
- do not return anything on the body


### PUT `/api/users/butter_bridge`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


### DELETE `/api`

Assertion: expected 404 to equal 405

Hints:
- use `.all()` on each route, to serve a 405: Method Not Found status code


