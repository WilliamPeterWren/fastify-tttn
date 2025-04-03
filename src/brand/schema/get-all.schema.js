const standardResponses = require('../../schemas/standard.response');

const getAll = { 
  description: 'Get all brand endpoint',
  tags: ['Brand'],
  operationId: 'getAllBrand',
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
        brands: { 
          type: 'array', 
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string'},
              brand_name: { type: 'string' },
              brand_image: { type: 'string' },
            },
          },
        },
        total: { type: 'integer' },
        page: { type: 'integer' },
        limit: { type: 'integer' },
      },
    },
    ...standardResponses,
  }
}

module.exports = getAll;