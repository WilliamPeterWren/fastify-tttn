const tokenService = require('./token.service');

exports.refreshToken = (fastify) => async (request, reply) => {
  try {
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw fastify.httpErrors.badRequest('Refresh token is required');
    }
    const data = await tokenService.refreshToken(refreshToken, fastify);
    reply.send(data);
  } catch (err) {
    reply.code(401).send({ error: err.message });
  }
};

exports.accessToken = (fastify) => async (request, reply) => {
  try {
    const { refreshToken } = request.body;
    if (!refreshToken) {
      throw fastify.httpErrors.badRequest('Refresh token is required');
    }
    const accessToken = await tokenService.accessToken(refreshToken, fastify);
    reply.send({"accessToken":accessToken});
  } catch (err) {
    reply.code(401).send({ error: err.message });
  }
};

exports.logout = (fasitfy) => async (request, reply) => {
  try {
    const { refreshToken } = request.body;
    await tokenService.logout(refreshToken, fasitfy);
    reply.send({ message: 'Logged out successfully' });
  } catch (err) {
    reply.send({ error: err.message });
  }
};
