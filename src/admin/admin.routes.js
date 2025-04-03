const schema = require('./schema/index');
const adminMiddleware = require('../middleware/admin.middleware');

const adminController = require('./admin.controller');

async function adminRoutes(fastify, options) {

  fastify.post('/staff/register', { 
    preHandler: [ fastify.authenticate, adminMiddleware.isAdmin],
    schema: schema.register 
  }, adminController.registerStaff );

  fastify.post('/staff/update-role', { 
    preHandler: [ fastify.authenticate, adminMiddleware.isAdmin],
    schema: schema.updateRole 
  }, adminController.updateStaffRole );

  fastify.get('/staff',{ 
    preHandler: [ fastify.authenticate, adminMiddleware.isAdmin], 
    schema: schema.getStaff
  }, adminController.getStaffByRole)
}

module.exports = adminRoutes;