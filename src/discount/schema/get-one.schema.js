const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one discount endpoint',
  tags: ['Discount'],
  operationId: 'getOneDiscount',
  params: {
    type: 'object',
    properties: {
      slug: { type: 'string' }  
    },
    required: ['slug']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        discount: { 
          type: 'object',
          properties: {
            _id: { type: 'string',},
            value: { type: 'number' },
            isGlobal: { type: 'boolean' },
            name: { type: 'string' },
            expires_at: { 
              type: 'string', 
              format: 'date-time' 
            },
            slug: { type: 'string' },
          }
        },
        message: { type: 'string' },
        code: { type: 'integer' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        code: { type: 'integer' }
      }
    },
    ...standardResponses 
  }
};

module.exports = getOne;