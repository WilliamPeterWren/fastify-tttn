const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one brand endpoint',
  tags: ['Brand'],
  operationId: 'getOneBrand',
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        brand_name: { type: 'string' },
        brand_image: { type: 'string', nullable: true },
      },
    },
    ...standardResponses
  }
}

module.exports = getOne;