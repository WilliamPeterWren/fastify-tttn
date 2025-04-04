const standardResponses = require('../../schemas/standard.response');

const getOne = { 
  description: 'Get one product endpoint',
  tags: ['Product'],
  operationId: 'getOneProduct',
  params: {  
    type: 'object',
    properties: {
      slug: { type: 'string' },
    },
    required: ['slug'],
  },
  response: {
    200: {
      type: "object",
      properties: {
        product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            product_name: { type: "string" },
            details: { type: "string" },
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
            },
            // Battery
            battery: {
              type: 'object',
              properties: {
                capacity: { type: 'number', minimum: 0 },
                batteryType: { type: 'string' },
                maximumCharge: { type: 'number', minimum: 0 },
                chargeIncluded: { type: 'number', minimum: 0 },
                technology: { type: 'array', items: { type: 'string' } }
              }
            },

            // Camera
            camera: {
              type: 'object',
              properties: {
                backCamera: { type: 'string' },
                backFilm: { type: 'array', items: { type: 'string' } },
                backFlash: { type: 'boolean', default: true },
                backFeature: { type: 'array', items: { type: 'string' } },
                frontCamera: { type: 'string' },
                frontFilm: { type: 'array', items: { type: 'string' } },
                frontFeature: { type: 'array', items: { type: 'string' } }
              }
            },

            // Configuration
            configuration: {
              type: 'object',
              properties: {
                os: { type: 'string' },
                chip: { type: 'string' },
                cpu: { type: 'number', minimum: 0 },
                gpu: { type: 'string' }
              }
            },

            // Connection
            connection: {
              type: 'object',
              properties: {
                mobile: { type: 'array', items: { type: 'string' } },
                sim: { type: 'string' },
                wifi: { type: 'array', items: { type: 'string' } },
                gps: { type: 'array', items: { type: 'string' } },
                bluetooth: { type: 'array', items: { type: 'string' } },
                chargePort: { type: 'string' },
                jack: {  type: 'string' } ,
                anotherPort: { type: 'array', items: { type: 'string' } }
              }
            },

            // Design
            design: {
              type: 'object',
              properties: {
                design: { type: 'string' },
                material: { type: 'string' },
                sizeWeight: { type: 'string' },
                firstRelease: { type: 'string' }
              }
            },

            // Memory
            memory: {
              type: 'object',
              properties: {
                ram: { type: 'number', minimum: 0 },
                storage: { type: 'number', minimum: 0 },
                available: { type: 'number', minimum: 0 },
                contact: { type: 'string' }
              }
            },

            // Screen
            screen: {
              type: 'object',
              properties: {
                technology: { type: 'string' },
                resolution: { type: 'string' },
                diagonal: { type: 'string' },
                nits: { type: 'number', minimum: 0 },
                glass: { type: 'string' }
              }
            },

            // Utility
            utility: {
              type: 'object',
              properties: {
                advanceSecure: { type: 'array', items: { type: 'string' } },
                specialFeature: { type: 'array', items: { type: 'string' } },
                ip: { type: 'string' },
                record: { type: 'array', items: { type: 'string' } },
                film: { type: 'array', items: { type: 'string' } },
                music: { type: 'array', items: { type: 'string' } }
              }
            }
          }
        },
        message: {type:'string'},
        code: {type: 'number'},    
      },
    },
    ...standardResponses
  }
}

module.exports = getOne;
