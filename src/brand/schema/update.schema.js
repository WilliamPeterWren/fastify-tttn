const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update brand endpoint',
  tags: ['Brand'],
  operationId: 'updateBrand',
  params: {
    type: 'object',
    properties: {
      brandSlug: { type: 'string' }
    },
    required: ['brandSlug']
  },
  body: { 
    type: 'object', 
    properties: { 
      brand_name: { type: 'string' }, 
      brand_image: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        brand: {
          type: 'object',
          properties: {
            brand_name: { type: 'string' },
            brand_image: { type: 'string' }
          }
        },
        message: { type: 'string' },
        code: { type: 'integer' }
      }
    },
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