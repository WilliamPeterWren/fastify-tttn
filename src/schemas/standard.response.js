const errorSchema = require('./error.schema');

module.exports = {
  400: { description: 'Bad request', type: 'object', ...errorSchema },
  401: { description: 'Unauthorized code', type: 'object', ...errorSchema },
  403: { description: 'Forbidden', type: 'object', ...errorSchema },
  404: { description: 'Not found', type: 'object', ...errorSchema },
  409: { description: 'Conflict error', type: 'object', ...errorSchema },
  500: { description: 'Server error', type: 'object', ...errorSchema }
};
