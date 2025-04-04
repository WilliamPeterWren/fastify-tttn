const standardResponses = require('../../schemas/standard.response');

const responseSchema = {
  type: 'object',
  properties: {
    cart: {
      type: 'object',
      properties: {
          _id: { type: 'string' },
          // user: { type: 'string' }, 
          items: {
              type: 'array',
              items: {
                  type: 'object',
                  properties: {
                      product: { type: 'string' },
                      quantity: { type: 'number' },
                      // _id: { type: 'string' }, 
                      added_at: { type: 'string', format: 'date-time' }
                  }
              }
          } 
      }
    },
    message: { type: 'string' },
    code: { type: 'integer' }
  }
};

const remove = {
  description: 'Delete cart endpoint',
  tags: ['Cart'],
  operationId: 'removeCart',
  params: {
    type: 'object',
    properties: {
      cartId: { type: 'string', minLength: 1 }
    },
    required: ['cartId']
  },
  body: { 
      type: 'object', 
      properties: { 
          product: { type: 'string' }, 
      },
      required: ['product']
  },
  response: {
    200: responseSchema,
    ...standardResponses 
  }
};

module.exports = remove;