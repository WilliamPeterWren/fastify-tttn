const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update category endpoint',
  tags: ['Category'],
  operationId: 'updateCategory',
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
        _id: { type: 'string' },  
        category_name: { type: 'string' },
        parent: { type: 'string' }
      },
    },
    ...standardResponses
  }
}

module.exports = update;