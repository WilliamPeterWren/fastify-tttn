const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one brand endpoint',
  tags: ['Brand'],
  operationId: 'getOneBrand',
  params: {
    type: 'object',
    properties: {
      brandSlug: { type: 'string' }  
    },
    required: ['brandSlug']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        brand: { 
          type: 'object',
          properties: {
            _id: { type: 'string' },
            brand_name: { type: 'string' },
            brand_image: { type: 'string', nullable: true }
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

module.exports = getOne;