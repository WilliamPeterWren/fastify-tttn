const brandController = require('./brand.controller');
const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function brandRoutes(fastify, options){
  fastify.post('/create', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.create
  }, brandController.create(fastify));

  fastify.put('/update/:brandSlug', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.update
  }, brandController.update(fastify));

  fastify.delete('/delete/:brandSlug', {
    preHandler: [fastify.authenticate, adminMiddleware.isAdmin],  
    schema: schema.remove
  }, brandController.remove(fastify));

  fastify.get('/:brandSlug', {
    schema: schema.getOne
  }, brandController.getByBrandSlug(fastify));

  fastify.get('/get-all', {
    schema: schema.getAll
  }, brandController.getAllBrands(fastify));

}

module.exports = brandRoutes;
