const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one product endpoint',
  tags: ['Product'],
  operationId: 'getOneProduct',
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

module.exports = getOne;