const InvariantError = require('../../exceptions/InvariantError');
const { ActivityPayloadSchema, ActivityParamsSchema } = require('./schema');

const ActivityValidator = {
  validateActivityPayload: (payload) => {
    const validationResult = ActivityPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateActivityParams: (params) => {
    const validationResult = ActivityParamsSchema.validate(params);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
}

module.exports = ActivityValidator;
