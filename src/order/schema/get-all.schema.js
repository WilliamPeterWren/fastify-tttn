const standardResponses = require('../../schemas/standard.response');

const getAllOrders = {
    description: 'Get all order items endpoint',
    tags: ['Order'],
    operationId: 'getAllOrders',
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'integer', minimum: 1, default: 1 },
            limit: { type: 'integer', minimum: 1, default: 10 }
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                orders: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            payment_type: { type: 'string'},
                            order_items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        product: { type: 'string' },
                                        price_at_purchase: { type: 'number' },
                                        discount_at_purchase: { type: 'string' },
                                        quantity: { type: 'integer' },
                                    }
                                }
                            },
                            total_voucher: {type: 'number'},
                            status: {type: 'string'},
                            estimated_delivery: { type: 'string', format: 'date-time', nullable: true },
                            shipping_address: {
                                type: 'object',
                                properties: {
                                    // _id: { type: 'string' },
                                    street: { type: 'string' },
                                    ward: { type: 'string' },
                                    city: { type: 'string' },
                                    province: { type: 'string' },
                                    phone_number: { type: 'string' }
                                }
                            },
                            created_at: { type: 'string', format: 'date-time', nullable: true },
                        }
                    }                   
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        totalItems: { type: 'integer' },
                        totalPages: { type: 'integer' },
                        hasNext: { type: 'boolean' },
                        hasPrevious: { type: 'boolean' }
                    }
                },
                message: { type:'string' },
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

module.exports = getAllOrders;