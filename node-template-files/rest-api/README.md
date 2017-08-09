REST API
=========

A node-based REST API server built using [Hapi](https://hapijs.com/) and [Sequelize](http://docs.sequelizejs.com/).

## To Run:

```bash
$ npm start
```

Transpile all es6 code to plain javascript and then starts a local instance of the server listening at `localhost:8080`.

## To Test:

```bash
$ npm test
```

Runs eslint across all source and test code, followed by a suite of mocha tests.

## Development

All API routes are defined in `src/routes`. Each set of endpoints should be defined in their own `route` module given by the name `/route[.]<endpoint>[.]js/`. Every `route` module must export a default function that returns an array of endpoint objects defined as [Hapi routes](https://hapijs.com/api#serverrouteoptions). This function will be passed a `config` defining the app's configuration for use by the handler if needed. New route files will have their endpoints registered automatically when the app starts. Registration is recursive, so you may organize your route files in any number of subfolders inside of `src/routes`.

#### Example

For a collection of `books` endpoints, we create `route.books.js` and implement the following `route` function. In the real world, we would do input validation and error handling, but we'll keep things simple for this example.

```javascript
import Book from '../models/book';

export default function route(config) {
  return [
    {
      method: 'POST',
      path: '/books',
      handler: function handler(request, reply) {
        return Book.create(
          request.payload.name,
          request.payload.author
        )
        .then(result => (
          reply(result).code(201)
        ));
      },
    },

    {
      method: 'GET',
      path: '/books',
      handler: function handler(request, reply) {
        return Book.findAll()
        .then(result => (
          reply(result)
        ));
      },
    },

    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: function handler(request, reply) {
        return Book.findById(request.params.bookId)
        .then(result => (
          reply(result)
        ));
      },
    },

    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: function handler(request, reply) {
        return Book.findById(request.params.bookId)
        .then(result => (
          result.update(request.payload)
        ))
        .then(result => (
          reply(result)
        ));
      },
    },

    {
      method: 'PATCH',
      path: '/books/{bookId}',
      handler: function handler(request, reply) {
        return Book.findById(request.params.bookId)
        .then(result => (
          result.update(request.payload)
        ))
        .then(result => (
          reply(result)
        ));
      },
    },

    {
      method: 'DELETE',
      path: '/books/{bookId}',
        return Book.deleteById(request.params.bookId)
        .then(() => (
          reply().code(204)
        ));
      },
    },
  ];
}
```

**NOTE**: [Handlers MUST NOT be implemented using fat-arrow style](https://hapijs.com/api#route-handler), lest you make Hapi sad.

## Singletons

When the app starts, it initializes the following singletons when loading its configuration:

- `Bunyan.defaultLogger`: Logger instance (see `src/config/initializers/logger.js`)

Available by importing `Bunyan`.

- `Sequelize.defaultConnection`: Database connection instance (see `src/initializers/database.js`)

Available by importing `Sequelize`.

## Available Environment Variables

- `APP_ENV`: Application environment
- `APP_LOG_NAME`: Name of the Bunyan default logger
- `APP_LOG_LEVEL`: Log level for the Bunyan logger
- `APP_HOSTNAME`: Hostname or ip address the server will listen at
- `APP_PORT`: Port number the server will losten on
- `APP_DATABASE_DIALECT`: Database dialect Sequlize will use when connecting to the database
- `APP_DATABASE_STORAGE`: Storage type Sequelize will use if database dialect is sqlite
- `APP_DATABASE_HOST`: Hostname or ip address of the database
- `APP_DATABASE_USER`: User name of the database account
- `APP_DATABASE_PASSWORD`: Password for the database account
- `APP_DATABASE_NAME`: Name of the database
