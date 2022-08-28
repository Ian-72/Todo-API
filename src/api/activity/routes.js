const InvariantError = require('../../exceptions/InvariantError');

const routes = (handler, validation) => [
  // POST activity
  {
    method: 'POST',
    path: '/activity-groups',
    handler: handler.postActivityHandler,
    options: {
      validate: {
        payload: validation.payload,
        failAction: (req, h, err) => {
          // throw InvariantError if validation fail
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // GET all activity
  {
    method: 'GET',
    path: '/activity-groups',
    handler: handler.getAllActivityHandler,
  },
  // GET one activity by id
  {
    method: 'GET',
    path: '/activity-groups/{activityId}',
    handler: handler.getActivityByIdHandler,
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
  // PATCH (update) activity by id
  {
    method: 'PATCH',
    path: '/activity-groups/{activityId}',
    handler: handler.patchActivityByIdHandler,
    options: {
      validate: {
        params: validation.params,
        payload: validation.payload,
        failAction: (req, h, err) => {
          if (err) {
            throw new InvariantError(err.message);
          }
        },
      },
    },
  },
  // DELETE activity by id
  {
    method: 'DELETE',
    path: '/activity-groups/{activityId}',
    handler: handler.deleteActivityByIdHandler,
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
