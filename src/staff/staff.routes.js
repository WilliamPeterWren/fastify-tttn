
const schema = require('./schema/index');
const staffMiddleware = require('../middleware/staff.middleware');

const staffController = require('./staff.controller');

async function staffRoutes(fastify, options) {

  fastify.get('/user/get-active-users', { 
    preHandler: [ fastify.authenticate, staffMiddleware.isStaff], 
    schema: schema.getActiveUser
  }, staffController.getActiveUsers);

  fastify.get('/user/get-deactive-users', { 
    preHandler: [ fastify.authenticate, staffMiddleware.isStaff],
    schema: schema.getDeactiveUser
  }, staffController.getDeactiveUsers);

  fastify.patch('/user/:id/deactivate', { 
    preHandler: [ fastify.authenticate, staffMiddleware.isStaff], 
  }, staffController.deactivateUser);

  fastify.patch('/user/:id/reactivate', { 
    preHandler: [ fastify.authenticate, staffMiddleware.isStaff],
  }, staffController.reactivateUser);

  fastify.get('/user/:id', { 
    preHandler: [fastify.authenticate, staffMiddleware.isStaff], 
  }, staffController.getUserById(fastify));
}

module.exports = staffRoutes;