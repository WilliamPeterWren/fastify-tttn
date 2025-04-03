const standardResponses = require('../../schemas/standard.response');

const getAll = { 
  description: 'Get all product endpoint',
  tags: ['Product'],
  operationId: 'getAllProduct',
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
        product: {
          type: 'object',
          properties: {
            product_name: { type: 'string' },
            details: { type: 'string' },
            brand: { type: 'string' },
            product_images: { 
              type: 'array',
              items: { type: 'object', properties: { url: { type: 'string' } } }
            },
            stock: { type: 'number' },
            categories: { 
              type: 'array', 
              items: { type: 'string' }
            },
            discount: { type: 'string', nullable: true },
            latest_price: { type: 'string', nullable: true },
            reviews: { type: 'array', items: { type: 'string' }, nullable: true }
          },
        },
      },
    },
    ...standardResponses
  }
}

module.exports = getAll;