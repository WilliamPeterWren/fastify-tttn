const User = require('../models/User');
const mail = require('../mail/mailer');
const bcrypt = require('bcryptjs');
const { generatePassword } = require('../utils/user.utils');

const otps = new Map();

const verifyPasswordOTP = async (email, otp, fastify) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw fastify.httpErrors.unauthorized("Invalid credentials");

  const isValid = verifyOTP(email, otp);
  if (!isValid) return "Invalid or expired OTP";

  const password = generatePassword();
  user.password = await bcrypt.hash(password, 10);
  await user.save();

  await mail.sendPassword(email, password);

  return { message: "Check your email for the new password!" };
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const saveOTP = (email, code) => {
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otps.set(email, { code, expiresAt });
};

const verifyOTP = (email, code) => {
  const entry = otps.get(email);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) return false;
  return entry.code === code;
};

module.exports = {
  verifyPasswordOTP,
  generateOTP,
  saveOTP,
  verifyOTP
};
