Basic Node App
=========

A basic node-based app.

## To Run:

```bash
$ npm start
```

Transpile all es6 code to plain javascript and then runs the application.

## To Test:

```bash
$ npm test
```

Runs eslint across all source and test code, followed by a suite of mocha tests.

## Singletons

When the app starts, it initializes the following singletons when loading its configuration:

- `Bunyan.defaultLogger`: Logger instance (see `src/config/initializers/logger.js`)

Available by importing `Bunyan`.
