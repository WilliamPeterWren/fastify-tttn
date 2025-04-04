const addressService = require('./address.service');

// Get all addresses
const getAll = (fastify) => async (request, reply) => {
    try {
        const items = await addressService.getAll();
        reply.send(items);
    } catch (error) {
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Get addresses by user ID
const getByUserId = (fastify) => async (request, reply) => {
    try {
        const { userId } = request.params; 
        const addresses = await addressService.getByUserId(userId);
        reply.send(addresses);
    } catch (error) {
        if (error.message === 'User not found or deactivated') {
            return reply.code(404).send({ message: error.message });
        }
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Get address by address ID
const getByAddressId = (fastify) => async (request, reply) => {
    try {
        const { addressId } = request.params;  
        const address = await addressService.getByAddressId(addressId);
        reply.send(address);
    } catch (error) {
        if (error.message === 'Address not found') {
            return reply.code(404).send({ message: error.message });
        }
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Create a new address
const create = (fastify) => async (request, reply) => {
    try {
        const newItem = await addressService.create(request.body);
        reply.code(201).send(newItem);
    } catch (error) {
        if (error.message === 'User not found or deactivated') {
            return reply.code(404).send({ message: error.message });
        }
        if (error.message === 'User can have maximum 3 addresses') {
            return reply.code(400).send({ message: error.message });
        }
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Update an address
const update = (fastify) => async (request, reply) => {
    try {
        const { id } = request.params;
        const updatedItem = await addressService.update(id, request.body);
        reply.send(updatedItem);
    } catch (error) {
        if (error.message === 'Address not found') {
            return reply.code(404).send({ message: error.message });
        }
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Delete an address
const remove = (fastify) => async (request, reply) => {
    try {
        const { id } = request.params;
        const result = await addressService.remove(id);
        reply.send(result);
    } catch (error) {
        if (error.message === 'Address not found') {
            return reply.code(404).send({ message: error.message });
        }
        reply.code(500).send({ message: 'Internal Server Error', error: error.message });
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