const standardResponses = require('../../schemas/standard.response');

const getAll = { 
  description: 'Get all category endpoint',
  tags: ['Category'],
  operationId: 'getAllCategory',
  querystring: {
    type: 'object',  
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    },
    additionalProperties: false 
  },
  response: {
    200: {
      type: 'object',
      properties: {
        categories: { 
          type: 'array', 
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string'},
              category_name: { type: 'string' },
              parent: { type: 'string', nullable: true },
            },
          },
        },
        message: { type: 'string' },
        code: { type: 'number' },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
    ...standardResponses,
  }
}

module.exports = getAll;