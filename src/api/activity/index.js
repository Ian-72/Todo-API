const ActivityHandler = require('./handler');
const routes = require('./routes');
const ActivitySchemas = require('./validation');

module.exports = {
  name: 'activity',
  version: '1.0',
  register: async (server, { service }) => {
    const activityHandler = new ActivityHandler(service);
    server.route(routes(activityHandler, ActivitySchemas));
  },
};
