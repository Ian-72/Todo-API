const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const model = require('../models/index');

class TodoService {
  constructor() {
    this._model = model.todo;
  }

  /**
   * Insert todo record to todos table
   * @param {*} {}
   * @return {*} 
   * @memberof TodoService
   */
  async addTodo(payload) {
    // Query to todo model to find specific todo by id
    const activity = await model.activity.findByPk(payload.activity_group_id, { raw: true });
    if (!activity) { // If activity undefined
      // Throw new NotFoundError
      throw new NotFoundError(`Activity with activity_group_id ${payload.activity_group_id} Not Found`);
    }

    // Define payload
    const createdAt = new Date().toDateString();
    const newPayload = {
      title: payload.title,
      activity_group_id: payload.activity_group_id,
      is_active: payload.is_active,
      priority: payload.priority,
      created_at: createdAt,
      updated_at: createdAt
    }
    // Querying to todo model to insert an record
    const { dataValues } = await this._model.create(newPayload);
    if (!dataValues) { // If not contain data
      // Throw InvariantError
      throw new InvariantError('Fail to create todo');
    }

    // Return response object with todo data
    return {
      created_at: dataValues.created_at,
      updated_at: dataValues.updated_at,
      id: dataValues.id,
      title: dataValues.title,
      activity_group_id: dataValues.activity_group_id,
      is_active: dataValues.is_active,
      priority: dataValues.priority
    };
  }

  /**
   * Getting all todo record form todos table
   * @param query
   * @return {*} 
   * @memberof TodoService
   */
  async getAllTodo({ activity_group_id }) {
    // If activity_group_id not undefine
    if (activity_group_id) {
      // Query to todo model with query parameter
      const result = await this._model.findAll({
        where: {
          activity_group_id: activity_group_id
        },
        limit: 500
      }, { 
        raw: true
      });

      // Returning result
      return result
    }

    // Query to todo model without query parameter
    const result = await this._model.findAll({ raw: true, limit: 1000 });

    // Returning result
    return result;
  }

  /**
   * Get todo record by id from todos table
   * @param {*} { todoId }
   * @return {*} 
   * @memberof TodoService
   */
  async getTodo({ todoId }) {
    // query to todo model to find todo by id
    const result = await this._model.findByPk(todoId, { raw: true });
    if (!result) { // if result null 
      // throw notfound error
      throw new NotFoundError(`Todo with ID ${todoId} Not Found`);
    }

    // Returning result
    return result;
  }

  /**
   * Edit todo record by id from todos table
   * @param {*} { todoId }
   * @param {*} ({ activityId }, payload)
   * @return {*} 
   * @memberof ActivityService
   */
   async editTodo({ todoId }, { title, is_active }) {
    // Query to todo model to find specific todo by id
    const todo = await this._model.findByPk(todoId, { raw: true });
    if (!todo) { // if todo not found
      // Throw new NotFoundError
      throw new NotFoundError(`Todo with ID ${todoId} Not Found`);
    }
    // Update todo
    const updatedAt = new Date().toISOString();
    try {
      await this._model.update({ title, is_active, updated_at: updatedAt}, { where: { id: todoId } });
    } catch (error) {
      throw new InvariantError(`Fail to update todo ${todoId}`)
    }

    // returning new todo data
    const newTodo = await this._model.findByPk(todoId, { raw: true });
    return newTodo;
  }

  /**
   * Delete todo record by id from todos table
   * @param {*} { todoId }
   * @return {*} 
   * @memberof TodoService
   */
  async deleteTodo({ todoId }) {
    // Query to todo model to delete todo by id
    const result = await this._model.destroy({ where: { id: todoId } });
    if (!result) { // If result not contain data
      // Throw NotFoundError
      throw new NotFoundError(`Todo with ID ${todoId} Not Found`);
    }

    return {};
  }
}

module.exports = TodoService
