const routes = require('./routes');
const TodoHandler = require('./handler');

module.exports = {
  name: 'todo',
  version: '1.0',
  register: async (server, { service, validator }) => {
    const todoHandler = new TodoHandler(service, validator)
    server.route(routes(todoHandler));
  }
}