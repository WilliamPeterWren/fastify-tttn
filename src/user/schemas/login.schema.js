const standardResponses = require('../../schemas/standard.response');

const loginSchema = {
  description: 'User login endpoint',
  tags: ['User'],
  operationId: 'loginUser',
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
    },
    required: ['email', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } },
            // is_verified: { type: 'boolean' },
            // created_at: { type: 'string' },
          },
        },
      },
    },
    ...standardResponses
  },
};

module.exports = loginSchema;