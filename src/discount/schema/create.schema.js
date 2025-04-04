
const standardResponses = require('../../schemas/standard.response');

const create = {
  description: 'Create discount endpoint',
  tags: ['Discount'],
  operationId: 'createDiscount',
  body: { 
    type: 'object', 
    properties: { 
      value: { type: 'number', minimum: 0 }, 
      isGlobal: { type: 'boolean' }, 
      name: { type: 'string' },
      expires_at: { 
        type: 'string', 
        format: 'date-time' 
      },
    }, 
    required: ['value', 'isGlobal', 'expires_at']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        discount: {
          type: 'object',
          properties: {
            value: { type: 'number', minimum: 0 }, 
            isGlobal: { type: 'boolean' }, 
            name: { type: 'string' },
            expires_at: { 
              type: 'string', 
              format: 'date-time' 
            },
            slug: { type: 'string' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
    ...standardResponses
  }
};

module.exports = create;
