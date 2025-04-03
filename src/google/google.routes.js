// googleRoutes.js
const googleController = require('./google.controller')

async function googleRoutes(fastify, options) {
  fastify.get('/login/google/callback', googleController.login);
  fastify.get('/profile', googleController.profile);
};

module.exports = googleRoutes;