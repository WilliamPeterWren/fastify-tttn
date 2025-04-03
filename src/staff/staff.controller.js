const staffService = require('./staff.service');

const getActiveUsers = async (request, reply) => {
  try {
    const { page = 1, limit = 10, activeOnly = true } = request.query;
    const users = await staffService.getActiveUsers(page, limit, activeOnly);
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const deactivateUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await staffService.deactivateUser(id);
    reply.send({ message: 'User deactivated successfully', user });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const reactivateUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await staffService.reactivateUser(id);
    reply.send({ message: 'User reactivated successfully', user });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const getDeactiveUsers = async (request, reply) => {
  try {
    const { page = 1, limit = 10, activeOnly = true } = request.query;
    const users = await staffService.getDeactiveUsers(page, limit, activeOnly);
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const getUserById = (fastify) => async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await staffService.getUserById(id, fastify);
    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }
    reply.send(user);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};


module.exports = {
  getActiveUsers,
  getDeactiveUsers,
  deactivateUser,
  reactivateUser,
  getUserById
};
