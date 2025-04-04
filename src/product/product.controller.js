const productService = require('./product.service');

exports.create = (fastify) => async (request, reply) => {
    try {
        const { product_name, brand, details, category, variants} = request.body;

        if (!product_name || !brand || !details || !category || !variants) {
            return reply.status(400).send({ message: 'Required fields are missing' });
        }

        const product = await productService.create(request.body, fastify);
        reply.send({ message: 'Product created successfully', product, code: 201 });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};


exports.getAllProducts = async (request, reply) => {
    try {
        let { page = 1, limit = 10 } = request.query;

        page = Math.max(parseInt(page, 10) || 1, 1);
        limit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

        const products = await productService.getAllProducts(page, limit);

        const total = products.length; 

        reply.send({
            products,
            message: "Products retrieved successfully", 
            code: 200,
            page,
            limit,
            total
        });
    } catch (err) {
        reply.status(500).send({
            message: err.message || 'Internal server error',
            code: 500
        });
    }
};


exports.getProductBySlug = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        const product = await productService.getProductBySlug(slug, fastify);

        if (!product) {
            return reply.status(404).send({ message: 'Product not found' });
        }

        reply.send({product, message: 'Product successfully retrived', code: 200});
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};


exports.updateProduct = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        if (!slug || typeof slug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid product slug');
        }

        const updatedData = request.body;
        const updatedProduct = await productService.updateProduct(slug, updatedData);

        reply.code(200).send({
            message: 'Product updated successfully',
            product: updatedProduct, 
            code: 200
        });
    } catch (error) {
        if (error.message === 'Product not found') {
            throw fastify.httpErrors.notFound(error.message);
        } else if (error.message.includes('Variant') && error.message.includes('not found')) {
            throw fastify.httpErrors.badRequest(error.message);
        } else if (error.name === 'CastError') {
            throw fastify.httpErrors.badRequest('Invalid product ID');
        } else if (fastify.httpErrors.isHttpError(error)) {
            throw error;
        } else {
            fastify.log.error('Error updating product:', error);
            throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
        }
    }
};


exports.deleteProduct = (fastify) => async (request, reply) => {
    try {
        const { slug } = request.params;
        if (!slug || typeof slug !== 'string') {
            throw fastify.httpErrors.badRequest('Invalid slug');
        }

        const deletedProduct = await productService.deleteProduct(slug);

        reply.code(200).send({
            product: {
                _id: deletedProduct._id.toString(),
                product_name: deletedProduct.product_name
            },
            message: 'Product deleted successfully',
            code: 200
        });
    } catch (error) {
        if (error.message === 'Product not found') {
            throw fastify.httpErrors.notFound(error.message);
        } else if (error.message === 'Invalid slug') {
            throw fastify.httpErrors.badRequest(error.message);
        } else {
            throw fastify.httpErrors.internalServerError(error.message || 'Internal server error');
        }
    }
};

exports.updateProductPrice = async (request, reply) => {
    try {
        const { id } = request.params;
        const { price } = request.body;

        if (!price || price <= 0) {
            return reply.status(400).send({ message: 'Invalid price' });
        }

        const updatedPrice = await productService.updateProductPrice(id, price);
        reply.send({ message: 'Product price updated successfully', updatedPrice });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.getProductPriceHistory = async (request, reply) => {
    try {
        const { id } = request.params;
        const priceHistory = await productService.getProductPriceHistory(id);
        reply.send(priceHistory);
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};