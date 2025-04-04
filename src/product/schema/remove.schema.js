const standardResponses = require('../../schemas/standard.response');

const remove = {
  description: 'Delete product endpoint',
  tags: ['Product'],
  operationId: 'removeProduct',
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
        product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            product_name: { type: 'string' }
          },
          required: ['_id', 'product_name'] 
        },
        message: { type: 'string' },
        code: { type: 'integer' }
      },
      required: ['product', 'message', 'code']
    },
    400: {
      type: 'object',
      properties: { message: { type: 'string' }, code: { type: 'integer' } }
    },
    404: {
      type: 'object',
      properties: { message: { type: 'string' }, code: { type: 'integer' } }
    },
    ...standardResponses
  }
};

module.exports = remove;