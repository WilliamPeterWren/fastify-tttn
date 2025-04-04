const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update discount endpoint',
  tags: ['Discount'],
  operationId: 'updateDiscount',
  params: {
    type: 'object',
    properties: {
      slug: { type: 'string' }
    },
    required: ['slug']
  },
  body: { 
    type: 'object', 
    properties: { 
      value: { type: 'string', mininum: 0 }, 
      isGlobal: { type: 'boolean' }, 
      name: { type: 'string' },
      expires_at: { type: 'date' },
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        discount: {
          type: 'object',
          properties: {
            _id: { type: 'string',},
            value: { type: 'string' },
            isGlobal: { type: 'boolean' },
            name: { type: 'string' },
            expires_at: {type: 'date'},
            slug: { type: 'string' },
          }
        },
        message: { type: 'string' },
        code: { type: 'integer' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'integer' }
      }
    },
    ...standardResponses 
  }
};

module.exports = update;