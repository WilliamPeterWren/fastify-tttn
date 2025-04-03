const productController = require('./product.controller');

const schema = require('./schema/index')
const adminMiddleware = require('../middleware/admin.middleware');
const staffMiddleware = require('../middleware/staff.middleware');

async function productRoutes(fastify, options) {

  fastify.post('/create', { 
    preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
    schema: schema.create
  }, productController.create(fastify));

  // fastify.get('/products', { 
  //   schema: schema.getAll
  // }, productController.getAllProducts);

  // fastify.get('/products/:id',{
  //   schema: schema.getOne
  // }, productController.getProductById);

  // fastify.put('/products/:id', { 
  //   preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
  //   schema: schema.update
  // }, productController.updateProduct);

  // fastify.delete('/products/:id', { 
  //   preHandler: [fastify.authenticate, adminMiddleware.isAdmin] 
  // }, productController.deleteProduct);

  // fastify.get('/products/:id/price-history',{
  //   preHandler: [fastify.authenticate, staffMiddleware.isStaff],  
  // }, productController.getProductPriceHistory);
}

module.exports = productRoutes;
