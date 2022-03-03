const Joi = require('joi');

// For validate Parameter
const TodoParamsSchemas = Joi.object({
  todoId: Joi.number().required()
});

// For validate Query
const TodoQuerySchemas = Joi.object({
  activity_group_id: Joi.number()
});

// For validate Payload with method POST
const PostTodoPayloadSchemas = Joi.object({
  title: Joi.string().required().messages({'any.required': `title cannot be null`}),
  activity_group_id: Joi.number().required().messages({'any.required': `activity_group_id cannot be null`}),
  priority: Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
  ),
  is_active: Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
  ),
});

// For validate Payload with method PATCH
const PatchTodoPayloadSchemas = Joi.object({
  title: Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
  ),
  is_active: Joi.alternatives().try(
    Joi.string(),
    Joi.number(),
    Joi.boolean(),
  ),
});

module.exports = {
  TodoParamsSchemas,
  TodoQuerySchemas,
  PostTodoPayloadSchemas,
  PatchTodoPayloadSchemas
};
