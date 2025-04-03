const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one category endpoint',
  tags: ['Category'],
  operationId: 'getOneCategory',
  params: {  
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
    required: ['id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        category_name: { type: 'string' },
        parent: { type: 'string', nullable: true },
      },
    },
    ...standardResponses,
  }
}

module.exports = getOne;

