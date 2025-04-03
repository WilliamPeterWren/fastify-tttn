const orderService = require('./orderService');

exports.createOrder = async (request, reply) => {
    try {
        const userId = request.user.id; 
        const order = await orderService.createOrder(userId, request.body);
        reply.send({ message: 'Order placed successfully', order });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.getOrderById = async (request, reply) => {
    try {
        const { id } = request.params;
        const order = await orderService.getOrderById(id);
        reply.send(order);
    } catch (err) {
        reply.status(404).send({ error: err.message });
    }
};

exports.getAllOrders = async (request, reply) => {
    try {
        const { page = 1, limit = 10 } = request.query;
        const orders = await orderService.getAllOrders(page, limit);
        reply.send(orders);
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.updateOrderStatus = async (request, reply) => {
    try {
        const { id } = request.params;
        const { status } = request.body;

        if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return reply.status(400).send({ message: 'Invalid order status' });
        }

        const updatedOrder = await orderService.updateOrderStatus(id, status);
        reply.send({ message: 'Order status updated', updatedOrder });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.deleteOrder = async (request, reply) => {
    try {
        const { id } = request.params;
        const deletedOrder = await orderService.deleteOrder(id);
        if (!deletedOrder) return reply.status(404).send({ message: 'Order not found' });

        reply.send({ message: 'Order deleted successfully' });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};
