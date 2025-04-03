const addressController = require('./address.controller');
const schema = require('./schema/index')
async function addressRoutes(fastify, options){
  fastify.post('/create', {
    preHandler: [fastify.authenticate],  
    schema: schema.create
  }, addressController.create(fastify));

  fastify.put('/update/:id', {
    preHandler: [fastify.authenticate],  
    schema: schema.update
  }, addressController.update(fastify));

  fastify.delete('/delete/:id', {
    preHandler: [fastify.authenticate],  
  }, addressController.remove(fastify));

  fastify.get('/by-user-id/:userId', {
    preHandler: [fastify.authenticate],  
  }, addressController.getByUserId(fastify));

  fastify.get('/by-address-id/:addressId', {
    preHandler: [fastify.authenticate],  
  }, addressController.getByAddressId(fastify));

}

module.exports = addressRoutes;
