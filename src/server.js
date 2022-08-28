require('dotenv').config();
const os = require('os');
const cluster = require('cluster');

const Hapi = require('@hapi/hapi');

const ClientError = require('./exceptions/ClientError');
const NotFoundError = require('./exceptions/NotFoundError');

const activity = require('./api/activity');
const ActivityService = require('./services/mysql/ActivityService');

const todo = require('./api/todo');
const TodoService = require('./services/mysql/TodoServices');

const init = async () => {
  const activityService = new ActivityService();
  const todoService = new TodoService();

  // initial hapi server
  const server = Hapi.Server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3030,
    routes: {
      cors: {
        origin: ['*'], // allow all origin to access this server
      },
    },
  });

  // register all custom plugin
  await server.register([
    {
      plugin: activity,
      options: {
        service: activityService,
      },
    },
    {
      plugin: todo,
      options: {
        service: todoService,
      },
    },
  ]);

  // extension before response
  server.ext('onPreResponse', (request, h) => {
    const { response } = request; // get response from request

    if (response instanceof ClientError) {
      if (response instanceof NotFoundError) {
        return h.response({
          status: 'Not Found',
          message: response.message,
          data: {},
        }).code(response.statusCode);
      }
      return h.response({
        status: 'Bad Request',
        message: response.message,
        data: {},
      }).code(response.statusCode);
    }

    return response.continue || response; // continue response
  });

  await server.start();
  console.log(`server running on ${server.info.uri}`);
};

// * use all the cores on the processor * //
const clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.id} has exitted`);
    });
  } else {
    init();
  }
} else {
  init();
}
