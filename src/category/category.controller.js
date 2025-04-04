const categoryService = require('./category.service');

exports.createCategory = (fastify) => async (request, reply) => {
    try {
        const { category_name, parent } = request.body;

        if (!category_name) {
            throw fastify.httpErrors.badRequest('Category name is required');
        }

        const category = await categoryService.createCategory(category_name, parent);
        reply.code(201).send({
            message: 'Category created successfully',
            category,
            code: 201
        });
    } catch (error) {
        if (fastify.httpErrors?.isHttpError(error)) {
            reply.code(error.statusCode).send({
                message: error.message,
                code: error.statusCode
            });
        } else if (error.message === 'Category already exists') {
            throw fastify.httpErrors.conflict(error.message);
        } else {
            reply.code(500).send({
                message: error.message || 'Internal server error',
                code: 500
            });
        }
    }
};

exports.getAllCategories = async (request, reply) => {
    try {
        const { page = 1, limit = 10 } = request.query;
        const categories = await categoryService.getAllCategories(page, limit);
        const response = {
            categories,
            total: categories?.length,
            page,
            limit,
            message: 'Categories retrieved successfully',
            code: 200 
        };

        reply.send(response);
    } catch (err) {
        console.log(err.message);
        reply.code(500).send({ error: err.message });
    }
};


exports.updateCategory = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        const { category_name, parent } = request.body;

        if (!slug) {
            throw fastify.httpErrors.badRequest('Slug is required');
        }
        if (!category_name) {
            throw fastify.httpErrors.badRequest('Category name is required');
        }

        const category = await categoryService.updateCategory(slug, category_name, parent);

        reply.code(200).send({
            category,
            message: 'Category updated successfully',
            code: 200
        });
    } catch (error) {
        if (fastify.httpErrors?.isHttpError(error)) {
            reply.code(error.statusCode).send({
                message: error.message,
                code: error.statusCode
            });
        } else if (error.message === 'Category not found') {
            throw fastify.httpErrors.notFound(error.message);
        } else if (error.message === 'Invalid category slug') {
            throw fastify.httpErrors.badRequest(error.message);
        } else {
            throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
        }
    }
};


exports.deleteCategory = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;

        if (!slug) {
            throw fastify.httpErrors.badRequest('Slug is required');
        }

        const deletedCategory = await categoryService.deleteCategory(slug);

        reply.code(200).send({
            message: 'Category deleted successfully',
            category: deletedCategory,
            code: 200
        });
    } catch (error) {
        if (fastify.httpErrors?.isHttpError(error)) {
            reply.code(error.statusCode).send({
                message: error.message,
                code: error.statusCode
            });
        } else if (error.message === 'Category not found') {
            throw fastify.httpErrors.notFound(error.message);
        } else if (error.message === 'Invalid category slug') {
            throw fastify.httpErrors.badRequest(error.message);
        } else {
            throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
        }
    }
};

exports.getCategoryBySlug = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        if(!slug){
            return reply.code(400).send({ message: 'Slug is required' });
        }
        console.log(slug);

        const c = await categoryService.getCategoryBySlug(slug, fastify);

        if (!c) {
            return reply.code(404).send({ message: 'Category not found', code: 404 });  
        }
        reply.send({
            category: c, 
            message: 'Category retrieved successfully',
            code: 200
        });
    } catch (err) {
        reply.code(500).send({ error: err.message });
    }
};
