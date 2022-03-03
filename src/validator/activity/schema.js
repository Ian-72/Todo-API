const Joi = require('joi');

const ActivityPayloadSchema = Joi.object({
  title: Joi.string().required().messages({'any.required': `title cannot be null`}),
  email: Joi.string().allow(''),
});

const ActivityParamsSchema = Joi.object({
  activityId: Joi.number().required(),
});

module.exports = { 
  ActivityPayloadSchema,
  ActivityParamsSchema
};
