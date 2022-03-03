const InvariantError = require('../../exceptions/InvariantError');
const {
  TodoParamsSchemas,
  TodoQuerySchemas,
  PostTodoPayloadSchemas,
  PatchTodoPayloadSchemas
} = require('./schema');

const TodoValidator = {
  validateTodoParams: (params) => {
    const validationResult = TodoParamsSchemas.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateTodoQuery: (query) => {
    const validationResult = TodoQuerySchemas.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostTodoPayload: (payload) => {
    const validationResult = PostTodoPayloadSchemas.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePatchTodoPayload: (payload) => {
    const validationResult = PatchTodoPayloadSchemas.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}

module.exports = TodoValidator;
