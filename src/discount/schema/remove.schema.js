const standardResponses = require('../../schemas/standard.response');

const remove = {
  description: 'Delete discount endpoint',
  tags: ['Discount'],
  operationId: 'removeDiscount',
  params: {
    type: 'object',
    properties: {
      slug: { type: 'string', minLength: 1 }
    },
    required: ['slug']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        discount: { 
          type: 'object',
          properties: {
            _id: { type: 'string',},
            value: { type: 'number' },
            isGlobal: { type: 'boolean' },
            name: { type: 'string' },
            expires_at: { 
              type: 'string', 
              format: 'date-time' 
            },
            slug: { type: 'string' },
          }
        },
        message: { type: 'string' },
        code: { type: 'integer' },
      }
    },
    ...standardResponses 
  }
};

module.exports = remove;