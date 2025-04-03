const brandController = require('./brand.controller');
const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function brandRoutes(fastify, options){
  fastify.post('/create', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.create
  }, brandController.create(fastify));

  fastify.put('/update/:brandId', {
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.update
  }, brandController.update(fastify));

  fastify.delete('/delete/:id', {
    preHandler: [fastify.authenticate, adminMiddleware.isAdmin],  
  }, brandController.remove(fastify));

  fastify.get('/:brandId', {
    schema: schema.getOne
  }, brandController.getByBrandId(fastify));

  fastify.get('/get-all', {
    schema: schema.getAll
  }, brandController.getAllBrands(fastify));

}

module.exports = brandRoutes;
