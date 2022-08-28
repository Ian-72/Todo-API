class TodoHandler {
  constructor(service) {
    this._service = service;

    this.postTodoHandler = this.postTodoHandler.bind(this);
    this.getAllTodoHandler = this.getAllTodoHandler.bind(this);
    this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
    this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
    this.patchTodoByIdHandler = this.patchTodoByIdHandler.bind(this);
  }

  async postTodoHandler({ payload }, h) {
    // Call todoService to getting todo data
    const todo = await this._service.addTodo(payload);

    // Return json response contain todo data with 201 status code success
    return h.response({
      status: 'Success',
      message: 'Success',
      data: todo,
    }).code(201);
  }

  async getAllTodoHandler({ query }) {
    // Call todoService to getting all todo data
    const todos = await this._service.getAllTodo(query);

    // Return json response contain todos data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: todos,
    };
  }

  async getTodoByIdHandler({ params }) {
    // Call todoService to getting todo data
    const todo = await this._service.getTodo(params);

    // Return json response contain todo data with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: todo,
    };
  }

  async patchTodoByIdHandler({ params, payload }) {
    // Calling todoService
    const todo = await this._service.editTodo(params, payload);

    // Returning todo data
    return {
      status: 'Success',
      message: 'Success',
      data: todo,
    };
  }

  async deleteTodoByIdHandler({ params }) {
    // Call todoService to delete todo data by id
    const todo = await this._service.deleteTodo(params);

    // Return json response with 200 status code success
    return {
      status: 'Success',
      message: 'Success',
      data: todo,
    };
  }
}

module.exports = TodoHandler;
