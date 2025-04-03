const Roles = require('../roles/index');
const standardResponses = require('../../schemas/standard.response');

const updateRole = {
  description: 'Update staff endpoint',
  tags: ['User'],
  operationId: 'updateStaff',
  body: {
    type: 'object',
    properties: {
      user_id: { type: 'string' },
      roles: { type: 'string', enum: Object.values(Roles), default: 'STAFF' }
    },
    required: ['user_id', 'roles']
  },
  response: {
    201: {
      description: 'Staff successfully updated',
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

module.exports = updateRole;