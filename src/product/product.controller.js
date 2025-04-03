const productService = require('./product.service');

exports.create = (fastify) => async (request, reply) => {
    try {
        const { product_name, brand, details, product_images, stock, latest_price, categories, discount } = request.body;
        if (!product_name || !brand || !stock || !latest_price) {
            return reply.status(400).send({ message: 'Required fields are missing' });
        }

        const product = await productService.create({ product_name, brand, details, product_images, stock, latest_price, categories, discount }, fastify);
        reply.send({ message: 'Product created successfully', product });
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
        reply.send(products);
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};


exports.getProductById = async (request, reply) => {
    try {
        const { id } = request.params;
        const product = await productService.getProductById(id);

        if (!product) {
            return reply.status(404).send({ message: 'Product not found' });
        }

        reply.send(product);
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.updateProduct = async (request, reply) => {
    try {
        const { id } = request.params;
        const updatedData = request.body;

        const updatedProduct = await productService.updateProduct(id, updatedData);

        if (!updatedProduct) {
            return reply.status(404).send({ message: 'Product not found' });
        }

        reply.send({ message: 'Product updated successfully', updatedProduct });
    } catch (err) {
        reply.status(500).send({ error: err.message });
    }
};

exports.deleteProduct = async (request, reply) => {
    try {
        const { id } = request.params;
        const deletedProduct = await productService.deleteProduct(id);

        if (!deletedProduct) {
            return reply.status(404).send({ message: 'Product not found' });
        }

        reply.send({ message: 'Product deleted successfully' });
    } catch (err) {
        reply.status(500).send({ error: err.message });
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