const brandService = require('./brand.service');

exports.getAllBrands = (fastify) => async (req, res) => {
    try {
        const brands = await brandService.getAllBrands(fastify);
        const total = brands.length;  
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const response = {
            brands,
            total,
            page,
            limit
        };

        // console.log(response); 

        res.send(response);
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};

exports.getByBrandId = (fastify) => async (req, res) => {
    try {
        const brand = await brandService.getByBrandId(req.params.brandId, fastify);
        if (!brand) return res.code(404).send({ message: 'Brand not found' });
        res.send(brand);
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};

exports.create = (fastify) => async (req, res) => {
    try {
        const newItem = await brandService.create(req.body, fastify);
        res.code(201).send(newItem);
    } catch (error) {
        res.code(400).send({ message: error.message });
    }
};

exports.update = (fastify) => async (req, res) => {
    try {
        const brand = await brandService.update(req.params.brandId, req.body, fastify);
        if (!brand) return res.code(404).send({ message: 'Brand not found' });
        console.log(brand);
        res.send(brand);
    } catch (error) {
        res.code(400).send({ message: error.message });
    }
};

exports.remove = (fastify) => async (req, res) => {
    try {
        const deletedItem = await brandService.remove(req.params.id, fastify);
        if (!deletedItem) return res.code(404).send({ message: 'Brand not found' });
        res.send({ message: 'Brand deleted' });
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};
