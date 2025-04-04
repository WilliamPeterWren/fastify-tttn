const standardResponses = require('../../schemas/standard.response');

const update = {
  description: 'Update category endpoint',
  tags: ['Category'],
  operationId: 'updateCategory',
  params: {  
    type: 'object',
    properties: {
      slug: { type: 'string' },
    },
    required: ['slug'],
  },
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
            _id: { type: 'string' },  
            category_name: { type: 'string' },
            parent: { type: 'string' }
          }
        },
        message: {type: 'string'},
        code: {type: 'number'},       
      },
    },
    ...standardResponses
  }
}

module.exports = update;