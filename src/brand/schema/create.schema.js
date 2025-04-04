const standardResponses = require('../../schemas/standard.response');

const create = {
  description: 'Create brand endpoint',
  tags: ['Brand'],
  operationId: 'createBrand',
  body: { 
    type: 'object', 
    properties: { 
      brand_name: { type: 'string' }, 
      brand_image: { type: 'string' }, 
    }, 
    required: ['brand_name', 'brand_image']
  },
  response: {
    201: {
      type: 'object',
      properties: {
        brand: {
          type: 'object',
          properties: {
            brand_name: { type: 'string' },
            brand_image: { type: 'string' },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
      },
    },
    ...standardResponses
  }
};

module.exports = create;