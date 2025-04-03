const adminService = require('./admin.service');

const getActiveUsers = async (request, reply) => {
  try {
    const { page = 1, limit = 10, activeOnly = true } = request.query;
    const users = await adminService.getActiveUsers(page, limit, activeOnly);
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const deactivateUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await adminService.deactivateUser(id);
    reply.send({ message: 'User deactivated successfully', user });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const reactivateUser = async (request, reply) => {
  try {
    const { id } = request.params;
    const user = await adminService.reactivateUser(id);
    reply.send({ message: 'User reactivated successfully', user });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const logoutUser = async (request, reply) => {
  try {
    const { refreshToken } = request.body;
    if (!refreshToken) return reply.code(400).send({ message: 'No refresh token provided' });

    await adminService.logoutUserService(refreshToken);
    reply.send({ message: 'Logged out successfully' });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const registerStaff = async (request, reply) => {
  try {
    const staff = await adminService.registerStaff(request);
    reply.send({ message: 'Staff account created successfully', staff });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const updateStaffRole = async (request, reply) => {
  try {
    const updateStaff = await adminService.updateStaffRole(request);
    reply.send({ message: 'Staff account updated successfully', updateStaff });
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const getDeactiveUsers = async (request, reply) => {
  try {
    const { page = 1, limit = 10, activeOnly = true } = request.query;
    const users = await adminService.getDeactiveUsers(page, limit, activeOnly);
    reply.send(users);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

const refreshToken = async (request, reply) => {
  try {
    const { refreshToken } = request.body;
    const accessToken = await adminService.refreshToken(refreshToken);
    reply.send({ accessToken });
  } catch (err) {
    const status = err.message.includes('required') ? 401 : 403;
    reply.code(status).send({ error: err.message });
  }
};

const getStaffByRole = async (request, reply) => {
  try {
    const { roles, status } = request.query;
    console.log(roles)
    const staffs = await adminService.getStaffByRole(roles, status);
    reply.send(staffs);
  } catch (err) {
    reply.code(500).send({ error: err.message });
  }
};

module.exports = {
  getActiveUsers,
  deactivateUser,
  reactivateUser,
  logoutUser,
  registerStaff,
  updateStaffRole,
  getDeactiveUsers,
  refreshToken,
  getStaffByRole,
};
