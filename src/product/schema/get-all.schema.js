const standardResponses = require('../../schemas/standard.response');

const getAll = { 
  description: 'Get all product endpoint',
  tags: ['Product'],
  operationId: 'getAllProduct',
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
      type: "object",
      properties: {
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              _id: { type: "string" },
              product_name: { type: "string" },
              details: { type: "string" },
              slug: { type: "string" },
              brand: { 
                type: "object",
                properties: { 
                  brand_name: { type: "string" },
                },
                nullable: true 
              },
              product_images: {
                type: "array",
                items: { 
                  type: "object", 
                  properties: { url: { type: "string" } } 
                }
              },
              category: {
                type: "object",               
                properties: {
                  category_name: { type: "string" }                  
                }
              },
              variants:{
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: { type: "string"},
                    color: { type: "string" },
                    price: { type: "number" },
                    storage: { type: "number" },
                  },
                  required: ["color", "price", "storage"]
                }
              }
            }
          }
        },
        total: { type: "number" },
        page: { type: "number" },
        limit: { type: "number" },
        message: { type: "string" },
        code: { type: "number" },
      }
    },
   ...standardResponses,
  }
}

module.exports = getAll;
