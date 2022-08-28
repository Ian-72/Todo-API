const InvariantError = require('../../exceptions/InvariantError');

const routes = (handler, validation) => [
  // POST todo
  {
    method: 'POST',
    path: '/todo-items',
    handler: handler.postTodoHandler,
    options: {
      validate: {
        payload: validation.payload.post,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // GET all todo
  {
    method: 'GET',
    path: '/todo-items',
    handler: handler.getAllTodoHandler,
    options: {
      validate: {
        query: validation.query,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // GET single todo
  {
    method: 'GET',
    path: '/todo-items/{todoId}',
    handler: handler.getTodoByIdHandler,
    options: {
      validate: {
        params: validation.params,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // PATCH single todo
  {
    method: 'PATCH',
    path: '/todo-items/{todoId}',
    handler: handler.patchTodoByIdHandler,
    options: {
      validate: {
        params: validation.params,
        payload: validation.payload.patch,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // DELETE single todo
  {
    method: 'DELETE',
    path: '/todo-items/{todoId}',
    handler: handler.deleteTodoByIdHandler,
    options: {
      validate: {
        params: validation.params,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
];

module.exports = routes;
