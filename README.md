# Backend for NorthCoders News App

The is the backend for the news app. It handles all the contributing authors and site users, articles and associated comments, for the frontend which can be found [here](https://fe-nc-news-4543524.herokuapp.com).

The app is hosted [here](https://whispering-river-81489.herokuapp.com/api) on Heroku. Follow the link for a list of the available endpoints.

Clone this repo and jump inside the directory:
```{js}
git clone git@github.com:turnerem/be-nc-news.git

cd be-nc-news
```

To work with this backend you will need to install some dependencies and seed a local database. Working with **Node.js**:
```{js}
npm i

npm run setup-dbs
```

To test the functionality of the endpoints:
```{js}
npm run test
```

Relational databases are created with postgres (**pg**) and managed with **knex**. We also query these databases with **knex**. 

Knex requires **knexfile.js** for database configurations. This file must specify the *client* for relational database management, *migrations*, and *seeds*. A *connection* must also be specified, which will depend on the process environment (e.g.: dev, test, or production).

Minimum versions required:
- **knex**: 0.20.4
- **pg**: 7.14.0

