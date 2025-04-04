const standardResponses = require('../../schemas/standard.response');

const create = {
  description: 'Create cart endpoint',
  tags: ['Cart'],
  operationId: 'createCart',
  body: {
    type: 'object',
    properties: {
      product: { type: 'string' },
      quantity: { type: 'number', minimum: 0 },
    },
    required: ['product', 'quantity']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        cart: {
          type: 'object',
          properties: {
            // _id: { type: 'string' },
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
        code: { type: 'number' }
      }
    },
    ...standardResponses
  }
};

module.exports = create;