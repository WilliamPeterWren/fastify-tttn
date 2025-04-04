const discountController = require('./discount.controller');
const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function discountRoutes(fastify, options){
  fastify.post('/create', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.create
  }, discountController.create(fastify));

  fastify.put('/update/:slug', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.update
  }, discountController.update(fastify));

  fastify.delete('/delete/:slug', {
    preHandler: [fastify.authenticate, adminMiddleware.isAdmin],  
    schema: schema.remove
  }, discountController.remove(fastify));

  fastify.get('/:slug', {
    schema: schema.getOne
  }, discountController.getByDiscountSlug(fastify));

  fastify.get('/get-all', {
    schema: schema.getAll
  }, discountController.getAllDiscounts(fastify));

}

module.exports = discountRoutes;
