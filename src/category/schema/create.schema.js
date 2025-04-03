const standardResponses = require('../../schemas/standard.response');

const create = {
  description: 'Create category endpoint',
  tags: ['Category'],
  operationId: 'createCategory',
  body: { 
    type: 'object', 
    properties: { 
      category_name: { type: 'string' }, 
      parent: { type: 'string' },
    }, 
    required: ['category_name']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        category: {
          type: 'object',
          properties: {
            category_name: { type: 'string' },
            parent: { type: 'string' },
          },
        },
      },
    },
    ...standardResponses
  }
}

module.exports = create;