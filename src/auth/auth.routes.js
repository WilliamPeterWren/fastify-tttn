const config = require('./config/index');
const authController = require('./auth.controller');

async function auth (fastify, options) {
  fastify.post("/auth/verify-otp-password",{
    config: config.passwordRateLimitConfig,
  }, authController.verifyPasswordOTP(fastify) );

  fastify.post('/get-otp', authController.getOTP(fastify));

  fastify.post('/verify-otp', authController.verifyOTP(fastify));
}

module.exports = auth;