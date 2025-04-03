const standardResponses = require('../../schemas/standard.response');

const register = {
  description: 'Register staff endpoint',
  tags: ['User'],
  operationId: 'registerStaff',
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      roles: { type: 'string', enum: ['STAFF', 'CUSTOMER'], default: 'CUSTOMER' }
    },
    required: ['email', 'password']
  },
  response: {
    201: {
      description: 'Staff successfully registered',
      type: 'object',
      properties: {
        message: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            roles: { type: 'string' },
            is_verified: { type: 'boolean' }
          }
        }
      }
    },
    ...standardResponses,
  }
}

module.exports = register;