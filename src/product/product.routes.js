const productController = require('./product.controller');

const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function productRoutes(fastify, options) {

  fastify.post('/create', { 
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.create
  }, productController.create(fastify));

  fastify.get('/get-all', { 
    schema: schema.getAll
  }, productController.getAllProducts);

  fastify.get('/:slug',{
    schema: schema.getOne
  }, productController.getProductBySlug(fastify));

  fastify.put('/update/:slug', { 
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.update
  }, productController.updateProduct(fastify));

  fastify.delete('/delete/:slug', { 
    preHandler: [fastify.authenticate, adminMiddleware.isAdmin],
    schema: schema.remove
  }, productController.deleteProduct(fastify));

}

module.exports = productRoutes;
