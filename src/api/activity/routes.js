const routes = (handler) => [
  // POST activity
  {
    method: 'POST',
    path: '/activity-groups',
    handler: handler.postActivityHandler,
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
  },
  // PATCH (update) activity by id
  {
    method: 'PATCH',
    path: '/activity-groups/{activityId}',
    handler: handler.patchActivityByIdHandler,
  },
  // DELETE activity by id
  {
    method: 'DELETE',
    path: '/activity-groups/{activityId}',
    handler: handler.deleteActivityByIdHandler,
  },
];

module.exports = routes;
