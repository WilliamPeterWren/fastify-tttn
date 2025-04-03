const tokenController = require('./token.controller');
const schema = require('./schemas');

async function tokenRoutes(fastify, options) {
  fastify.post('/refresh-token', {
    schema: schema.refresh,
  }, tokenController.refreshToken(fastify));

  fastify.post('/access-token', {
    schema: schema.refresh,
  }, tokenController.accessToken(fastify));

  fastify.post('/user/logout', {
    schema: schema.logout,
  }, tokenController.logout(fastify));

}

module.exports = tokenRoutes;
