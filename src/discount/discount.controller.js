const discountService = require('./discount.service');

exports.getAllDiscounts = (fastify) => async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const discounts = await discountService.getAllDiscounts(page, limit);
        const total = discounts.length;

        const response = {
            discounts,
            total,
            page,
            limit,
            message: 'Discounts retrieved successfully',
            code: 200
        };

        res.code(200).send(response);
    } catch (error) {
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.getByDiscountSlug = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        if (!slug || typeof slug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid discount slug');
        }

        const discount = await discountService.getByDiscountSlug(slug);

        reply.code(200).send({
            discount,
            message: 'Discount retrieved successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Discount not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        fastify.log.error('Error fetching discount by slug:', error);
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.create = (fastify) => async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw fastify.httpErrors.badRequest('Discount name is required');
        }

        const discount = await discountService.create(req.body);
        res.code(201).send({
            discount,
            message: 'Discount created successfully', 
            code: 201
        });
    } catch (error) {
        if (error.message === 'Discount with this name already exists') {
            throw fastify.httpErrors.conflict(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.update = (fastify) => async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || typeof slug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid discount slug');
        }

        const discount = await discountService.update(slug, req.body);
        res.code(200).send({
            discount,
            message: 'Discount updated successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Discount not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.remove = (fastify) => async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug || typeof slug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid discount slug');
        }

        const discount = await discountService.remove(slug);
        res.code(200).send({
            discount,
            message: 'Discount deleted successfully', 
            code: 200
        });
    } catch (error) {
        if (error.message === 'Discount not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};