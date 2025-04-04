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

const update = {
    description: 'Update cart endpoint',
    tags: ['Cart'],
    operationId: 'updateCart',
    params: {
        type: 'object',
        properties: {
            cartId: { type: 'string' }
        },
        required: ['cartId']
    },
    body: { 
        type: 'object', 
        properties: { 
            product: { type: 'string' }, 
            quantity: { type: 'number', minimum: 0 }
        },
        required: ['product', 'quantity']
    },
    response: {
        200: responseSchema,
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