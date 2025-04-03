const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update product endpoint',
  tags: ['Product'],
  operationId: 'updateProduct',
  body: { 
    type: 'object', 
    properties: { 
      _id: {type: 'string', required: true},
      product_name: { type: 'string', minLength: 1 }, 
      details: { type: 'string' }, 
      brand: { type: 'string' }, 
      product_images: { 
        type: 'array', 
        items: { 
          type: 'object', 
          properties: { url: { type: 'string' } } 
        } 
      },
      stock: { type: 'number', minimum: 0 },  
      categories: { 
        type: 'array', 
        items: { type: 'string' }
      },
      latest_price: { type: 'string', nullable: true }, 
    }, 
    required: ["_id"]
  },
  response: {
    200: {
      type: 'object',
      properties: {
        product: {
          type: 'object',
          properties: {
            product_name: { type: 'string', minLength: 1 }, 
            details: { type: 'string' }, 
            brand: { type: 'string' }, 
            product_images: { 
              type: 'array', 
              items: { 
                type: 'object', 
                properties: { url: { type: 'string' } } 
              } 
            },
            stock: { type: 'number', minimum: 0 },  
            categories: { 
              type: 'array', 
              items: { type: 'string' }
            },
            latest_price: { type: 'string', nullable: true },
          },
        },
      },
    },
    ...standardResponses
  }
}

module.exports = update;