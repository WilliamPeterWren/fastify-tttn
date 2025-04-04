const standardResponses = require('../../schemas/standard.response');

const createReview = {
    description: 'Create a review endpoint',
    tags: ['Review'],
    operationId: 'createReview',
    body: {
        type: 'object',
        properties: {
            comment: { type: 'string' },
            rating: { type: 'number', minimum: 1, maximum: 5 }, 
            product: { type: 'string' } 
        },
        required: ['comment', 'rating', 'product']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                review: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        comment: { type: 'string' },
                        rating: { type: 'number' },
                        user: { type: 'string' },
                        product: { type: 'string' },
                        created_at: { type: 'string', format: 'date-time' }
                    }
                },
                message: { type: 'string' },
                code: { type: 'integer' }
            }
        },
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        ...standardResponses
    }
};

module.exports = createReview;