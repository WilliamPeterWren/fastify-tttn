const orderService = require('./order.service');

exports.purchase = (fastify) => async (req, res) => {
    try {
        const { payment_type, order_items, total_voucher, shipping_address } = req.body;

        if (!order_items || !shipping_address) {
            throw fastify.httpErrors.badRequest('order items and shipping address is required ...');
        }

        const user = req.user.userId;

        const order = await orderService.purchase(user, req.body);

        res.code(201).send({
            order,
            message: 'Order created successfully', 
            code: 201
        });
    } catch (error) {       
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};



exports.getAllOrders = (fastify) => async (request, reply) => {
    try {
        const userId = request.user.id || request.user.userId;
        const { page, limit } = request.query;
        const {orders, pagination} = await orderService.getAllOrders(userId, parseInt(page), parseInt(limit));
        reply.code(200).send({orders, pagination, message: 'get all orders', code: 200});
    } catch (error) {
        if (error.message.includes('Invalid') || error.message.includes('must be')) {
            return reply.code(400).send({ message: error.message });
        }
        if (error.message === 'Order not found for this user') {
            return reply.code(404).send({ message: error.message });
        }
        return reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};



exports.getOne = (fastify) => async (request, reply) => {
    try {
        const { orderId } = request.params;
        if (!orderId || typeof orderId !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid order slug');
        }

        const order = await orderService.getOne(orderId);

        reply.code(200).send({
            order,
            message: 'Order retrieved successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Order not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        fastify.log.error('Error fetching order by slug:', error);
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};


exports.update = (fastify) => async (request, reply) => {
    try {
        const { orderId } = request.params;
        const data = request.body;

        // if (!request.user.isStaff) {
        //     return reply.code(403).send({ message: 'Forbidden: Staff access required' });
        // }

        const result = await orderService.update(orderId, data);
        reply.send(result);
    } catch (error) {
        if (error.message.includes('Invalid')) {
            return reply.code(400).send({ message: error.message });
        }
        if (error.message === 'Order not found') {
            return reply.code(404).send({ message: error.message });
        }
        return reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};