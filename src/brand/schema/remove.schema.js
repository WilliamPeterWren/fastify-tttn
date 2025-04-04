const standardResponses = require('../../schemas/standard.response');

const remove = {
  description: 'Delete brand endpoint',
  tags: ['Brand'],
  operationId: 'removeBrand',
  params: {
    type: 'object',
    properties: {
      brandSlug: { type: 'string', minLength: 1 }
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
        code: { type: 'integer' },
      }
    },
    ...standardResponses 
  }
};

module.exports = remove;