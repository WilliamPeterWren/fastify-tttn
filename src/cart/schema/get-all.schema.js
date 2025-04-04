const standardResponses = require('../../schemas/standard.response');

const getCartResponseSchema = {
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
              _id: { type: 'string' }, 
              added_at: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    },
    pagination: {
      type: 'object',
      properties: {
        page: { type: 'integer' },
        limit: { type: 'integer' },
        totalItems: { type: 'integer' },
        totalPages: { type: 'integer' },
        hasNext: { type: 'boolean' },
        hasPrevious: { type: 'boolean' }
      }
    }
  }
};

const getAll = { 
  description: 'Get all cart endpoint',
  tags: ['Cart'],
  operationId: 'getAllCart',
  querystring: {
    type: 'object',  
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    },
    additionalProperties: false 
  },
  response: {
    200: getCartResponseSchema,
    ...standardResponses,
  }
}

module.exports = getAll;