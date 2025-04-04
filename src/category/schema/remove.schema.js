const standardResponses = require('../../schemas/standard.response');

const remove = {
  description: 'Delete category endpoint',
  tags: ['Category'],
  operationId: 'removeCategory',
  params: {
    type: 'object',
    properties: {
      slug: { type: 'string', minLength: 1 }
    },
    required: ['slug']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        category: { 
          type: 'object',
          properties: {
            _id: { type: 'string' },
            category_name: { type: 'string' },
            parent: { type: 'string', nullable: true }
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