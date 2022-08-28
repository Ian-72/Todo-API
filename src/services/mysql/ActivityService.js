const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const model = require('../../models/index');

class ActivityService {
  constructor() {
    this._model = model.activity;
  }

  async addActivity({ email, title }) {
    try {
      // Querying to activity model to insert an record
      const { dataValues } = await this._model.create({
        email,
        title,
      });

      if (!dataValues) { // if not contain data
        // Throw Invariant error
        throw new InvariantError('Fail to create activity');
      }

      // Return object with activity data
      return dataValues;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllActivity() {
    // Query to activity model  to get all activities
    const activities = await this._model.findAll({ raw: true, limit: 1000 });
    // Returning result
    return activities;
  }

  async getActivity({ activityId }) {
    // Query to activity model to find specific activity by id
    const activity = await this._model.findByPk(activityId, { raw: true });
    if (!activity) { // if activity not found
      // Throw NotFoundError
      throw new NotFoundError(`Activity with ID ${activityId} Not Found`);
    }
    // Returning result
    return activity;
  }

  async editActivity({ activityId }, { title }) {
    // Update activity
    const result = await this._model.update({ title }, { where: { id: activityId } });
    if (!result[0]) {
      throw new NotFoundError(`Activity with ID ${activityId} Not Found`);
    }

    // returning activity data
    const activity = await this._model.findByPk(activityId, { raw: true });
    return activity;
  }

  async deleteActivity({ activityId }) {
    // Query to activity model to delete activity by id
    const result = await this._model.destroy({ where: { id: activityId } });
    if (!result) { // if result not contain data
      // Throw NotFoundError
      throw new NotFoundError(`Activity with ID ${activityId} Not Found`);
    }

    return {};
  }
}

module.exports = ActivityService;
