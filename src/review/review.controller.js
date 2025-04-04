const reviewService = require('./review.service');

exports.createReview = (fastify) => async (request, reply) => {
    try {
        const userId = request.user.userId; 
        const data = request.body;
        const result = await reviewService.createReview(userId, data);
        reply.code(201).send(result);
    } catch (error) {
        if (error.message.includes('Invalid') || error.message.includes('must be')) {
            return reply.code(400).send({ message: error.message });
        }
        if (error.message === 'Product not found') {
            return reply.code(404).send({ message: error.message });
        }
        return reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};