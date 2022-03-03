const routes = (handler) => [
  // POST todo
  {
    method: 'POST',
    path: '/todo-items',
    handler: handler.postTodoHandler,
  },
  // GET all todo
  {
    method: 'GET',
    path: '/todo-items',
    handler: handler.getAllTodoHandler,
  },
  // GET single todo
  {
    method: 'GET',
    path: '/todo-items/{todoId}',
    handler: handler.getTodoByIdHandler,
  },
  // PATCH single todo
  {
    method: 'PATCH',
    path: '/todo-items/{todoId}',
    handler: handler.patchTodoByIdHandler,
  },
  // DELETE single todo
  {
    method: 'DELETE',
    path: '/todo-items/{todoId}',
    handler: handler.deleteTodoByIdHandler,
  }
];

module.exports = routes;
