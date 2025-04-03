const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getActiveUsers = async(page = 1, limit = 10, activeOnly = true) => {
  const query = activeOnly ? { is_active: true } : {};
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select('-password');
  
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

const registerStaff = async (request) => {
  const { email, password } = request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new User({ email, password: hashedPassword, roles: ['STAFF'] });
    const savedStaff = await newStaff.save();
    return { id: savedStaff._id, email, roles: 'STAFF' };
  } catch (err) {
    throw new Error('Error creating staff: ' + err.message);
  }
}

const updateStaffRole = async (request)=>{

  const { user_id, roles } = request.body;
  const user = await User.findOne({ _id: user_id });

  if (!user) {
    throw new Error('User not found');
  }

  if(!user.roles.includes(roles)){
    user.roles.push(roles);
    await user.save();
  }

  return user;
};

const getStaffByRole = async (roles, status) => {
  const staff = await User.find({
    roles: { $in: [roles] },
    is_active: status
  });

  if (!staff.length) {
    throw new Error('No staff found');
  }

  return staff;
}


module.exports = {
  getActiveUsers,
  getDeactiveUsers,
  deactivateUser,
  reactivateUser,
  registerStaff,
  updateStaffRole,
  getStaffByRole,

};
