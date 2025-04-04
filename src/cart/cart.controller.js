const cartService = require('./cart.service');

exports.addToCart = (fastify) => async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const userId = req.user.userId;

        if (!product || !quantity) {
            throw fastify.httpErrors.badRequest('product and quantity is required');
        }

        const cart = await cartService.addToCart(userId, product, quantity);
        res.code(201).send({
            cart,
            message: 'add to cart successfully', 
            code: 201
        });
    } catch (error) {
        if (error.message === 'Cart with this name already exists') {
            throw fastify.httpErrors.conflict(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.getAllCarts = (fastify) => async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const userId = req.user.userId;

        const {cart, pagination} = await cartService.getAllCarts(userId, page, limit);

        const response = {
            cart,
            pagination,
            message: 'Carts retrieved successfully',
            code: 200
        };

        res.code(200).send(response);
    } catch (error) {
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.getByCartSlug = (fastify) => async (request, reply) => {
    try {
        const { cartSlug } = request.params;
        if (!cartSlug || typeof cartSlug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid cart slug');
        }

        const cart = await cartService.getByCartSlug(cartSlug);

        reply.code(200).send({
            cart,
            message: 'Cart retrieved successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Cart not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        fastify.log.error('Error fetching cart by slug:', error);
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};


exports.update = (fastify) => async (req, res) => {
    try {
        const { cartId } = req.params;   
        const { product, quantity } = req.body;
        if (!product ||!quantity) {
            throw fastify.httpErrors.badRequest('product and quantity is required');
        }    

        const cart = await cartService.update(cartId, req.body);
        res.code(200).send({
            cart,
            message: 'Cart updated successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Cart not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.remove = (fastify) => async (req, res) => {
    try {
        const { cartId } = req.params;
        if (!cartId || typeof cartId !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid variantId ...');
        }

        const {product} = req.body;

        const cart = await cartService.remove(cartId, product);
        res.code(200).send({
            cart,
            message: 'Cart deleted successfully', 
            code: 200
        });
    } catch (error) {
        if (error.message === 'Cart not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};