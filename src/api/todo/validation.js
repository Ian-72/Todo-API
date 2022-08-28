const Joi = require('joi');

const TodoSchemas = {
  // * validate Parameter
  params: Joi.object({
    todoId: Joi.number().required(),
  }),
  // * validate Query
  query: Joi.object({
    activity_group_id: Joi.number(),
  }),
  // * validate Payload
  payload: {
    post: Joi.object({
      title: Joi.string().required().messages({ 'any.required': 'title cannot be null' }),
      activity_group_id: Joi.number().required().messages({ 'any.required': 'activity_group_id cannot be null' }),
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
    }),
    patch: Joi.object({
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
    }),
  },
};

module.exports = TodoSchemas;
