class ActivityHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Bind all method
    this.postActivityHandler = this.postActivityHandler.bind(this);
    this.getAllActivityHandler = this.getAllActivityHandler.bind(this);
    this.getActivityByIdHandler = this.getActivityByIdHandler.bind(this);
    this.patchActivityByIdHandler = this.patchActivityByIdHandler.bind(this);
    this.deleteActivityByIdHandler = this.deleteActivityByIdHandler.bind(this);
  }

  async postActivityHandler({ payload }, h) {
    // Validate payload
    this._validator.validateActivityPayload(payload);
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
    // Call activityService to getting activities data
    const activity = await this._service.getAllActivity();

    // Return json response contain activities data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    };
  }

  async getActivityByIdHandler({ params }) {
    // Validate params.activityId
    this._validator.validateActivityParams(params);
    // Call activityService to getting specific activity data
    const activity = await this._service.getActivity(params);

    // Return json response contain activity data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    }
  }

  async patchActivityByIdHandler({ params, payload }) {
    // Validate params.activityId
    this._validator.validateActivityParams(params);
    // Validate payload
    this._validator.validateActivityPayload(payload);
    // Call activityService to update specific activity
    const activity = await this._service.editActivity(params, payload);

    // Return json response contain new activity data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: activity,
    }
  }

  async deleteActivityByIdHandler({ params }) {
    // Validate params.activityId
    this._validator.validateActivityParams(params);
    // Calling activityService to delete specific activity
    const activity = await this._service.deleteActivity(params);
    
    // Return json response with 200 status code
    return {
      status: 'Success',
      message: 'Success',
      data: activity
    }
  }
}

module.exports = ActivityHandler;

module