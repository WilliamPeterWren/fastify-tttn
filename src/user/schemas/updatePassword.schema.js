const standardResponses = require('../../schemas/standard.response');

const updatePassword = {
  description: 'Update user password',
  tags: ['User'],
  operationId: 'updatePassword',
  body: {
    type: 'object',
    properties: {        
      password: { type: 'string', minLength: 6 },
    },
    required: ['password']
  },
  response: {
    200: {
      description: 'Password updated successfully',
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } },
            is_verified: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },    
    ...standardResponses,
  },
};

module.exports = updatePassword;
