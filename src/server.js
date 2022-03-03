const Hapi = require('@hapi/hapi');
require('dotenv').config();

const ClientError = require('./exceptions/ClientError');
const NotFoundError = require('./exceptions/NotFoundError');

const activity = require('./api/activity');
const ActivityService = require('./services/ActivityService');
const ActivityValidator = require('./validator/activity');

const todo = require('./api/todo');
const TodoService = require('./services/TodoServices');
const TodoValidator = require('./validator/todo');

const init = async () => {
  const activityService = new ActivityService();
  const todoService = new TodoService();

  // Start hapi server
  const server = Hapi.Server({
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: activity,
      options: {
        service: activityService,
        validator: ActivityValidator,
      },
    },
    {
      plugin: todo,
      options: {
        service: todoService,
        validator: TodoValidator,
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      if (response instanceof NotFoundError) {
        return h.response({
          status: 'Not Found',
          message: response.message,
          data: {}
        }).code(response.statusCode);
      }
      return h.response({
        status: 'Bad Request',
        message: response.message,
        data: {}
      }).code(response.statusCode);
    }

    return response.continue || response;
  });
  
  await server.start();
  console.log(`server running on ${server.info.uri}`);
}

init();
