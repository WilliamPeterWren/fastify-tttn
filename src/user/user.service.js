const User = require('../models/User');
const Address = require('../models/Address');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailer = require('../mail/mailer');
const authService = require('../auth/auth.service');
const tokenService = require('../token/token.service');

const loginHistory  = require('../loginHistory/loginHistory.service');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const ADDRESS_FASTIFY = process.env.ADDRESS_FASTIFY || "http://localhost:3000";


const register = async (request, fastify) => {
  const { email, password, roles } = request.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw fastify.httpErrors.conflict('Email already exists...');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);  
  const user = new User({
    email,
    password: hashedPassword,
    roles,
    is_active: true,
    is_verified: false
  });
  const savedUser = await user.save();

  const token = await tokenService.generateAccessToken({ email });
  const verifyLink = `${ADDRESS_FASTIFY}/users/verify-email?token=${token}`;
  await mailer.verifyEmail(user.email, verifyLink);
  
  return { id: savedUser._id, email, roles, is_verified: false };
};

const login = async (email, password, request, fastify) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw fastify.httpErrors.unauthorized('Invalid email or password');
  
  if (!user.is_verified) {
    throw fastify.httpErrors.forbidden('Please verify your email!');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw fastify.httpErrors.unauthorized('Invalid email or password');
  
  user.last_login = new Date();
  await user.save();
  const accessToken = await tokenService.generateAccessToken({
    userId: user._id,
    email: user.email,
    roles: user.roles
  });
  const refreshToken = await tokenService.createRefreshToken(user._id);
  loginHistory.traceHistory(user, request);
  const userObj = user.toObject();
  delete userObj.password;
  return { accessToken, refreshToken, user: userObj };
};

const updatePassword = async (userId, updateData, fastify) => {
  const user = await User.findById(userId);
  if (!user) {
    throw fastify.httpErrors.notFound('User not found.');
  }

  if (updateData.password) {
    if (updateData.password.length < 6) {
      throw fastify.httpErrors.badRequest('Password must be at least 6 characters.');
    }
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    if (!updatedUser) {
      throw fastify.httpErrors.notFound('User not found.');
    }

    // cần gọi log out jwt 

    return updatedUser;
  } catch (error) {
    fastify.log.error('Database error:', error);
    throw fastify.httpErrors.internalServerError('An error occurred while updating password.');
  }

};

const verifyEmail = async (request, fastify) => {
  const token = request.query.token;

  if (!token) {
    throw fastify.httpErrors.badRequest('Missing verification token.');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw fastify.httpErrors.notFound('User not found.');
    }

    if (user.is_verified) {
      throw fastify.httpErrors.badRequest('Email has already been verified.');
    }

    user.is_verified = true;
    await user.save();

    return ({
      message: 'Email verified successfully.',
    });
  } catch (err) {
    fastify.log.error(err);
    return ({
      error: 'Invalid or expired token.',
    });
  }
};

const profile = async (userId, fastify) => {
  const user = await User.findOne({ _id: userId, is_active: true }).select('-password -__v');
  if (!user) {
    throw fastify.httpErrors.notFound('User not found.');
  }

  const addresses = await Address.find({ user: userId }).select('-__v -user');

  const userObj = user.toObject();
  userObj.addresses = addresses;

  return {user: userObj};
};

const forgetPassword = async (email, fastify) => {
  const user = await User.findOne({email});
  if (!user) throw fastify.httpErrors.unauthorized("Invalid credentials");

  const otp = authService.generateOTP();
  authService.saveOTP(email, otp);
  await mailer.verifyPassword(email, otp);
  return { message: "OTP sent to email" };
};

module.exports = {
  register,
  login,
  updatePassword,
  verifyEmail,
  profile,
  forgetPassword
}
