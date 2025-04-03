const orderController = require('./orderController');

async function orderRoutes(fastify, options) {

    fastify.post('/orders', { 
        preHandler: [fastify.authenticate],  
        schema: { 
            body: { 
                type: 'object', 
                properties: { 
                    payment: { type: 'string' }, 
                    total_voucher: { type: 'number' }, 
                    shipping_address: { 
                        type: 'object', 
                        properties: { 
                            full_name: { type: 'string' }, 
                            street: { type: 'string' }, 
                            city: { type: 'string' }, 
                            postal_code: { type: 'string' }, 
                            country: { type: 'string' }, 
                            phone_number: { type: 'string' } 
                        }, 
                        required: ['full_name', 'street', 'city', 'postal_code', 'country', 'phone_number']
                    },
                    order_items: { 
                        type: 'array', 
                        items: { 
                            type: 'object', 
                            properties: { 
                                product: { type: 'string' }, 
                                type: { type: 'string' }, 
                                quantity: { type: 'number', min: 1 } 
                            }, 
                            required: ['product', 'type', 'quantity']
                        }
                    }
                }, 
                required: ['payment', 'shipping_address', 'order_items']
            }
        }
    }, orderController.createOrder);

    fastify.get('/orders', { 
        schema: { 
            querystring: { page: { type: 'integer', default: 1 }, limit: { type: 'integer', default: 10 } }
        }
    }, orderController.getAllOrders);

    fastify.get('/orders/:id', orderController.getOrderById);

    fastify.put('/orders/:id/status', { 
        preHandler: [fastify.authenticate],  
        schema: { 
            body: { type: 'object', properties: { status: { type: 'string' } }, required: ['status'] }
        } 
    }, orderController.updateOrderStatus);

    fastify.delete('/orders/:id', { preHandler: [fastify.authenticate] }, orderController.deleteOrder);
}

module.exports = orderRoutes;
