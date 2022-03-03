const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const model = require('../models/index');

class ActivityService {
  constructor() {
    this._model = model.activity;
  }

  /**
   * Insert record to activities table
   * @param {*} payload
   * @return {*} 
   * @memberof ActivityService
   */
  async addActivity({ email, title }) {
    // Define payload
    const createdAt = new Date().toDateString();
    const payload = {
      email,
      title,
      created_at: createdAt,
      updated_at: createdAt
    }
    // Querying to activity model to insert an record
    const { dataValues } = await this._model.create(payload);

    if (!dataValues) { // if not contain data
      // Throw Invariant error
      throw new InvariantError('Fail to create activity');
    }

    // Return object with activity data
    return {
      created_at: dataValues.created_at,
      updated_at: dataValues.updated_at,
      id: dataValues.id,
      title: dataValues.title,
      email: dataValues.email
    };
  }

  /**
   * Getting all record form activities table
   * @return {*} 
   * @memberof ActivityService
   */
  async getAllActivity() {
    // Query to activity model  to get all activities
    const result = await this._model.findAll({ raw: true, limit: 1000 });
    // Returning result
    return result;
  }

  /**
   * Get activity record by id from activities table
   * @param {*} { activityId }
   * @return {*} 
   * @memberof ActivityService
   */
  async getActivity({ activityId }) {
    // Query to activity model to find specific activity by id
    const  result = await this._model.findByPk(activityId, { raw: true }); 
    if (!result) { // if activity not found
      // Throw NotFoundError
      throw new NotFoundError(`Activity with ID ${activityId} Not Found`);
    }
    // Returning result
    return result;
  }

  /**
   * Edit activity record by id from activities table
   * @param {*} { activityId }
   * @param {*} payload
   * @return {*} 
   * @memberof ActivityService
   */
  async editActivity({ activityId }, { title }) {
    // Query to activity model to find specific activity by id
    const activity = await this._model.findByPk(activityId, { raw: true });
    if (!activity) { // if activity not found
      // Throw new NotFoundError
      throw new NotFoundError(`Activity with ID ${activityId} Not Found`);
    }
    // Update activity
    const updatedAt = new Date().toISOString();
    try {
      await this._model.update({ title, updated_at: updatedAt}, { where: { id: activityId } });
    } catch (error) {
      throw new InvariantError(`Fail to update activity ${activityId}`)
    }

    // returning activity data
    const newActivity = await this._model.findByPk(activityId, { raw: true });
    return newActivity;
  }

  /**
   * Delete activity record by id from activities table
   * @param {*} { activityId }
   * @return {*} 
   * @memberof ActivityService
   */
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

module.exports = ActivityService
