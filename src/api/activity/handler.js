class ActivityHandler {
  constructor(service) {
    this._service = service;

    // Bind all method
    this.postActivityHandler = this.postActivityHandler.bind(this);
    this.getAllActivityHandler = this.getAllActivityHandler.bind(this);
    this.getActivityByIdHandler = this.getActivityByIdHandler.bind(this);
    this.patchActivityByIdHandler = this.patchActivityByIdHandler.bind(this);
    this.deleteActivityByIdHandler = this.deleteActivityByIdHandler.bind(this);
  }

  async postActivityHandler({ payload }, h) {
    // Calling activityService to insert activity data
    const activity = await this._service.addActivity(payload);

    // Return json response with 201 status code
    return h.response({
      status: 'Success',
      message: 'Success',
      data: activity,
    }).code(201);
  }

  async getAllActivityHandler() {
    // Call activityService to get activities
    const activity = await this._service.getAllActivity();

    // Return json response contain activities data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    };
  }

  async getActivityByIdHandler({ params }) {
    // Call activityService to get specific activity
    const activity = await this._service.getActivity(params);

    // Return json response contain activity data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    };
  }

  async patchActivityByIdHandler({ params, payload }) {
    // Call activityService to update specific activity
    const activity = await this._service.editActivity(params, payload);

    // Return json response contain new activity data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    };
  }

  async deleteActivityByIdHandler({ params }) {
    // Calling activityService to delete specific activity
    const activity = await this._service.deleteActivity(params);

    // Return json response with 200 status code
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    };
  }
}

module.exports = ActivityHandler;
