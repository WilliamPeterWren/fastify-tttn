const brandService = require('./brand.service');

exports.getAllBrands = (fastify) => async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const brands = await brandService.getAllBrands(page, limit);
        const total = brands.length;

        const response = {
            brands,
            total,
            page,
            limit,
            message: 'Brands retrieved successfully',
            code: 200
        };

        res.code(200).send(response);
    } catch (error) {
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.getByBrandSlug = (fastify) => async (request, reply) => {
    try {
        const { brandSlug } = request.params;
        if (!brandSlug || typeof brandSlug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid brand slug');
        }

        const brand = await brandService.getByBrandSlug(brandSlug);

        reply.code(200).send({
            brand,
            message: 'Brand retrieved successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Brand not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        fastify.log.error('Error fetching brand by slug:', error);
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.create = (fastify) => async (req, res) => {
    try {
        const { brand_name } = req.body;
        if (!brand_name) {
            throw fastify.httpErrors.badRequest('Brand name is required');
        }

        const brand = await brandService.create(req.body);
        res.code(201).send({
            brand,
            message: 'Brand created successfully', 
            code: 201
        });
    } catch (error) {
        if (error.message === 'Brand with this name already exists') {
            throw fastify.httpErrors.conflict(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.update = (fastify) => async (req, res) => {
    try {
        const { brandSlug } = req.params;
        if (!brandSlug || typeof brandSlug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid brand slug');
        }

        const brand = await brandService.update(brandSlug, req.body);
        res.code(200).send({
            brand,
            message: 'Brand updated successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Brand not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};

exports.remove = (fastify) => async (req, res) => {
    try {
        const { brandSlug } = req.params;
        if (!brandSlug || typeof brandSlug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid brand slug');
        }

        const brand = await brandService.remove(brandSlug);
        res.code(200).send({
            brand,
            message: 'Brand deleted successfully', 
            code: 200
        });
    } catch (error) {
        if (error.message === 'Brand not found') {
            throw fastify.httpErrors.notFound(error.message);
        }
        throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
    }
};