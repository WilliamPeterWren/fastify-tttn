const { getByBrandSlug } = require('../../brand/brand.controller');
const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one category endpoint',
  tags: ['Category'],
  operationId: 'getOneCategory',
  params: {  
    type: 'object',
    properties: {
      slug: { type: 'string' },
    },
    required: ['slug'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        category:{
          type: 'object',
          properties: {
            _id: { type: 'string' },
            category_name: { type: 'string' },
            parent: { type: 'string', nullable: true },
          }
        },
        message: { type: 'string' },
        code: { type: 'integer' },
      },     
    },
    ...standardResponses,
  }
}

module.exports = getOne;

