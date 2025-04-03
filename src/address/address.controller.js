const addressService = require('./address.service');

const getAll = async (req, res) => {
    try {
        const items = await addressService.getAll();
        res.send(items);
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};

const getByUserId = (fastify) => async (req, res) => {
    try {
        const item = await addressService.getByUserId(req.params.userId, fastify);
        if (!item) return res.code(404).send({ message: 'User Id not found' });
        res.send(item);
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};

const getByAddressId = (fastify) => async (req, res) => {
    try {
        const item = await addressService.getByAddressId(req.params.userId, fastify);
        if (!item) return res.code(404).send({ message: 'Address id not found' });
        res.send(item);
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};


const create = (fastify) => async (req, res) => {
    try {
        const newItem = await addressService.create(req.body, fastify);
        res.send(newItem);
    } catch (error) {
        res.code(400).send({ message: error.message });
    }
};

const update = (fastify) => async (req, res) => {
    try {
        const updatedItem = await addressService.update(req.params.id, req.body, fastify);
        if (!updatedItem) return res.code(404).send({ message: 'Address not found' });
        res.send(updatedItem);
    } catch (error) {
        res.code(400).send({ message: error.message });
    }
};

const remove = (fastify) => async (req, res) => {
    try {
        const deletedItem = await addressService.remove(req.params.id, fastify);
        if (!deletedItem) return res.code(404).send({ message: 'Address not found' });
        res.send({ message: 'Address deleted' });
    } catch (error) {
        res.code(500).send({ message: error.message });
    }
};

module.exports = { 
    getAll, 
    getByUserId, 
    getByAddressId,
    create, 
    update, 
    remove 
};
