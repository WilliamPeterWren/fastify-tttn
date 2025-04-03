const Address = require('../models/Address');
const User = require('../models/User');

const getActiveUsers = async(page = 1, limit = 10, activeOnly = true) => {
  const query = activeOnly ? { is_active: true } : {};
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-password -__v');
  
  const totalUsers = await User.countDocuments(query);
  return { users, total: totalUsers, page, limit };
};

const getDeactiveUsers = async (page = 1, limit = 10, activeOnly = true) => {
  const query = activeOnly ? { is_active: false } : {};
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-password');
  
  const totalUsers = await User.countDocuments(query);
  return { users, total: totalUsers, page, limit };
};

const deactivateUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { is_active: false }, { new: true });
  if (!user) throw new Error('User not found.');
  return user;
};

const reactivateUser = async (userId) => {
  const user = await User.findByIdAndUpdate(userId, { is_active: true }, { new: true });
  if (!user) throw new Error('User not found.');
  return user;
};

const getUserById = async (userId, fastify) => {
  const user = await User.findOne({ _id: userId, is_active: true }).select('-password - __v');
  if (!user) {
    throw fastify.httpErrors.notFound('User not found or deactivated');
  }

  const addresses = await Address.find({user: userId}).select('-user -__v');

  const userObj = user.toObject();
  userObj.addresses = addresses;

  return {user: userObj};
};

module.exports = {
  getActiveUsers,
  getDeactiveUsers,
  deactivateUser,
  reactivateUser,
  getUserById,
};
