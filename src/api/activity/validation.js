const Joi = require('joi');

const ActivitySchemas = {
  // * validate parameter
  params: Joi.object({
    activityId: Joi.number().required(),
  }),
  // * validate payload
  payload: Joi.object({
    title: Joi.string().required().messages({ 'any.required': 'title cannot be null' }),
    email: Joi.string().allow(''),
  }),
};

module.exports = ActivitySchemas;
