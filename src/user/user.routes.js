
const userController = require('./user.controller');

const schema = require('./schemas/index');
const config = require('./config/index');


async function userRoutes(fastify, options) {
  fastify.post('/register', { 
    schema: schema.register
  }, userController.register(fastify));

  fastify.post('/login', {
    schema: schema.loginSchema,
    config: config.loginRateLimitConfig
  }, userController.login(fastify));

  fastify.put('/:id', { 
    preHandler: [fastify.authenticate], 
    schema: schema.updatePassword
  }, userController.updatePassword(fastify));

  fastify.get('/verify-email', userController.verifyEmail(fastify));

  fastify.get('/profile/:id', { 
    preHandler: [fastify.authenticate] 
  }, userController.profile(fastify));

  fastify.post("/forgot-password",{
    config: config.forgotPasswordRateLimitConfig
  }, userController.forgotPassword(fastify));
    
}

module.exports = userRoutes;

