const orderController = require('./order.controller');
const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function orderRoutes(fastify, options){
  fastify.post('/purchase', {
    preHandler: [fastify.authenticate],
    schema: schema.purchase
  }, orderController.purchase(fastify));

  fastify.get('/get-all', {
    preHandler: [fastify.authenticate],
    schema: schema.getAll
  }, orderController.getAllOrders(fastify));

  fastify.get('/:orderId', {
    preHandler: [fastify.authenticate],
    schema: schema.getOne
  }, orderController.getOne(fastify));

  fastify.put('/update/:orderId', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],
    schema: schema.update
  }, orderController.update(fastify));


}

module.exports = orderRoutes;
