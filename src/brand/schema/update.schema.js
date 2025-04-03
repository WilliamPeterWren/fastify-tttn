const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update brand endpoint',
  tags: ['Brand'],
  operationId: 'updateBrand',
  params: {
    type: 'object',
    properties: {
      brandId: { type: 'string' }  
    },
    required: ['brandId']
  },
  body: { 
    type: 'object', 
    properties: { 
      brand_name: { type: 'string' }, 
      brand_image: { type: 'string' } 
    }, 
    required: ['brand_name', 'brand_image']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },  
        brand_name: { type: 'string' },
        brand_image: { type: 'string' }
      },
    },
    ...standardResponses
  }
}

module.exports = update;
