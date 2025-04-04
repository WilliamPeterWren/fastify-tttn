const standardResponses = require('../../schemas/standard.response');

const responseSchema = {
            type: 'object',
            properties: {
                order: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        payment_type: { type: 'string' },
                        order_items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    product: { type: 'string' },
                                    price_at_purchase: { type: 'number' },
                                    discount_at_purchase: { type: 'string' },
                                    quantity: { type: 'integer' }
                                }
                            }
                        },
                        total_voucher: { type: 'number' },
                        status: { type: 'string' },
                        estimated_delivery: { type: 'string', format: 'date-time', nullable: true },
                        shipping_address: {
                            type: 'object',
                            properties: {
                                street: { type: 'string' },
                                ward: { type: 'string' },
                                city: { type: 'string' },
                                province: { type: 'string' },
                                phone_number: { type: 'string' }
                            }
                        },
                        created_at: { type: 'string', format: 'date-time', nullable: true }
                    }
                },
                message: { type: 'string' },
                code: { type: 'integer' }
            }
        }

const updateOrder = {
    description: 'Update an order endpoint (staff only)',
    tags: ['Order'],
    operationId: 'updateOrder',
    params: {
        type: 'object',
        properties: {
            orderId: { type: 'string' }
        },
        required: ['orderId']
    },
    body: {
        type: 'object',
        properties: {
            payment_type: {
                type: 'string',
                enum: ['momo', 'vnpay', 'paypal', 'bank_transfer', 'cash_on_delivery']
            },
            status: {
                type: 'string',
                enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
            },
            estimated_delivery: { type: 'string', format: 'date-time', nullable: true },
            shipping_address: {
                type: 'object',
                properties: {
                    street: { type: 'string' },
                    ward: { type: 'string' },
                    city: { type: 'string' },
                    province: { type: 'string' },
                    phone_number: { type: 'string' }
                }
            }
        },
        additionalProperties: false // Restrict to only these fields
    },
    response: {
        200: responseSchema,
        400: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        403: {
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

module.exports = updateOrder;