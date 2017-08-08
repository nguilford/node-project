routes
======
All API routes are defined here. Each set of endpoints should be defined in their own `route` module given by the name `/route[.]<endpoint>[.]js/`. Every `route` module must export a default function that returns an array of endpoint objects defined as [Hapi routes](https://hapijs.com/api#serverrouteoptions). Each function will be passed the app config for use by the handler if needed.

Each set of endpoints will be exported automatically by `src/routes/index.js` and registered in `src/server.js`.

## Example

For a collection of `books` endpoints, we can create `route.books.js`, as follows:

```javascript
import Book from '../models/book';

export default function route(config) {
  return [
    {
      method: 'GET',
      path: '/books',
      handler: (request, reply) => {
        // Handle request
      },
    },

    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: (request, reply) => {
        // Handle request
      },
    },

    {
      method: 'POST',
      path: '/books/{bookId}',
      handler: (request, reply) => {
        // Handle request
      },
    },

    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: (request, reply) => {
        // Handle request
      },
    },

    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: (request, reply) => {
        // Handle request
      },
    },

    {
      method: 'PATCH',
      path: '/books/{bookId}',
      handler: (request, reply) => {
        // Handle request
      },
    },
  ];
}
```