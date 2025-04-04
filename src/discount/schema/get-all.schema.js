const standardResponses = require('../../schemas/standard.response');

const getAll = { 
  description: 'Get all discount endpoint',
  tags: ['Discount'],
  operationId: 'getAllDiscount',
  querystring: {
    type: 'object',  
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    },
    additionalProperties: false 
  },
  response: {
    200: {
      type: 'object',
      properties: {
        discounts: { 
          type: 'array', 
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string',},
              value: { type: 'string' },
              isGlobal: { type: 'boolean' },
              name: { type: 'string' },
              expires_at: {type: 'date'},
              slug: { type: 'string' },

            },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
      },
    },
    ...standardResponses,
  }
}

module.exports = getAll;