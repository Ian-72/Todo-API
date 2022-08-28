const routes = require('./routes');
const TodoHandler = require('./handler');
const TodoSchemas = require('./validation');

module.exports = {
  name: 'todo',
  version: '1.0',
  register: async (server, { service }) => {
    const todoHandler = new TodoHandler(service);
    server.route(routes(todoHandler, TodoSchemas));
  },
};
