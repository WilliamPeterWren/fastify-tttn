const userService = require('./user.service');

// ----------------------------------------------------------------
exports.register = (fastify) => async (request, reply) => {
  const user = await userService.register(request, fastify);
  reply.code(201).send({
    message: "User registered successfully",
    user: {
      id: user.id,
      email: user.email,
      roles: user.roles,
      is_verified: user.is_verified,
    }
  });
};

exports.login = (fastify) => async (request, reply) => {
  const { email, password } = request.body;
  const { accessToken, refreshToken, user } = await userService.login(email, password, request, fastify);
  reply.code(200)
    .setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    }).
    send({ accessToken, refreshToken, user });
};

exports.updatePassword = (fastify) => async (request, reply) => {
  try {
    const { id } = request.params;
    const updatedUser = await userService.updatePassword(id, request.body, fastify);
    reply.send({ message: 'User updated successfully', updatedUser });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

exports.verifyEmail = (fastify) => async (request, reply) => {
  try {
    const response = await userService.verifyEmail(request, fastify);
    reply.send(response);
  } catch (error) {
    reply.code(500).send({ error: err.message });
  }
};

exports.profile = (fastify) => async (request, reply) => {
  try {
    const { id } = request.params;
    const data = await userService.profile(id, fastify);
    reply.send(data);
  } catch (err) {
    reply.code(404).send({ error: err.message });
  }
};

exports.forgotPassword = (fastify) => async (request, reply) => {
  const { email } = request.body;

  if (!email) {
    return reply.code(400).send({ message: "Email is required" });
  }

  try {
    const result = await userService.forgetPassword(email, fastify);
    return reply.send(result);
  } catch (err) {
    return reply.code(500).send({ message: "Failed to send OTP", error: err.message });
  }
};
// ----------------------------------------------------------------


