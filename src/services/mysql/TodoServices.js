const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const model = require('../../models/index');

class TodoService {
  constructor() {
    this._model = model.todo;
  }

  async addTodo({
    title,
    activity_group_id,
    is_active,
    priority,
  }) {
    try {
      // Querying to todo model to insert an record
      const { dataValues } = await this._model.create({
        title,
        activity_group_id,
        is_active,
        priority,
      });

      if (!dataValues) { // If not contain data
        // Throw InvariantError
        throw new InvariantError('Fail to create todo');
      }

      // Return response object with todo data
      return dataValues;
    } catch (error) {
      // if acativity id not found
      if (error.parent.errno === 1452) {
        throw new NotFoundError(`Activity with activity_group_id ${activity_group_id} Not Found`);
      }
      console.log(error.message);
      throw error;
    }
  }

  async getAllTodo({ activity_group_id }) {
    // If activity_group_id not undefine
    if (activity_group_id) {
      // Query to todo model with query parameter
      const todos = await this._model.findAll({
        where: {
          activity_group_id,
        },
      }, {
        raw: true,
      });

      // Returning result
      return todos;
    }

    // Query to todo model without query parameter
    const todos = await this._model.findAll({ raw: true, limit: 1000 });

    // Returning result
    return todos;
  }

  async getTodo({ todoId }) {
    // query to todo model to find todo by id
    const todo = await this._model.findByPk(todoId, { raw: true });
    if (!todo) { // if result null
      // throw notfound error
      throw new NotFoundError(`Todo with ID ${todoId} Not Found`);
    }

    // Returning result
    return todo;
  }

  async editTodo({ todoId }, { title, is_active }) {
    const result = await this._model.update({
      title,
      is_active,
    }, { where: { id: todoId } });

    if (!result[0]) {
      throw new NotFoundError(`Todo with ID ${todoId} Not Found`);
    }

    // returning new todo data
    const todo = await this._model.findByPk(todoId, { raw: true });
    return todo;
  }

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

module.exports = TodoService;
