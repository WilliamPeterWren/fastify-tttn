const standardResponses = require('../../schemas/standard.response');

const create = {
  description: 'Update addresses endpoint',
  tags: ['Address'],
  operationId: 'updateAddress',
  body: { 
    type: 'object', 
    properties: { 
      user: { type: 'string' }, 
      street: { type: 'string' }, 
      ward: { type: 'string' }, 
      city: { type: 'string' }, 
      province: { type: 'string' }, 
      phone_number: { type: 'string' }, 
    }, 
    required: ['user']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: {
            user: { type: 'string' },
            street: { type: 'string' },
            ward: { type: 'string' },
            city: { type: 'string' },
            province: { type: 'string' }, 
            phone_number: { type: 'string' }, 
          },
        },
      },
    },
    ...standardResponses
  }
}

module.exports = create;