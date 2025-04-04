const cartController = require('./cart.controller');
const schema = require('./schema/index')

async function cartRoutes(fastify, options){
  fastify.post('/add-to-cart', {
    preHandler: [fastify.authenticate],  
    schema: schema.addToCart
  }, cartController.addToCart(fastify));

  fastify.delete('/delete/:cartId', {
    preHandler: [fastify.authenticate],  
    schema: schema.remove
  }, cartController.remove(fastify));

  fastify.put('/update/:cartId', {
    preHandler: [fastify.authenticate],  
    schema: schema.update
  }, cartController.update(fastify));

  fastify.get('/get-cart', {
    preHandler: [fastify.authenticate],  
    schema: schema.getAll
  }, cartController.getAllCarts(fastify));

}

module.exports = cartRoutes;
