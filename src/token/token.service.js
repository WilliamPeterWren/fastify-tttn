const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../models/Token');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

//  Generate an access token
const generateAccessToken = async (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Generate a refresh token and store it in the DB
const createRefreshToken = async (userId, expiresIn = '7d') => {
  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn });

  await Token.deleteMany({ user_id: userId }); 
  await new Token({ user_id: userId, token: refreshToken }).save(); 

  return refreshToken;
};

//  Refresh an access token using a refresh token
const refreshToken = async (refreshToken, fastify) => {
  try {

    const existingToken = await Token.findOne({ token: refreshToken });
    if (!existingToken) {
      throw fastify.httpErrors.badRequest('Refresh token is invalid or has been used');
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    const accessToken = await generateAccessToken({ 
      userId: user._id,
      email: user.email,
      roles: user.roles
    });

    const newRefreshToken = await createRefreshToken(user._id);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw fastify.httpErrors.badRequest('Invalid or expired refresh token');
  }
};

const accessToken = async (refreshToken, fastify) => {
  try {
    const existingToken = await Token.findOne({ token: refreshToken });
    if (!existingToken) {
      throw fastify.httpErrors.badRequest('Refresh token is invalid or has been used');
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    const accessToken = await generateAccessToken({ 
      userId: user._id,
      email: user.email,
      roles: user.roles
    });
    return accessToken;
  } catch (error) {
    throw fastify.httpErrors.badRequest("Invalid or expired refresh token");
  }
}

//  Logout function (delete refresh token from DB)
const logout = async (refreshToken, fastify) => {
  if (!refreshToken) throw fastify.httpErrors.badRequest('Refresh token is required');
  await Token.deleteOne({ token: refreshToken });
};

//  Verify tokens
const verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);
const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_TOKEN_SECRET);

//  Check if a token exists in DB
const isTokenValid = async (token) => await Token.findOne({ token });

module.exports = {
  generateAccessToken,
  createRefreshToken,
  refreshToken,
  logout,
  verifyAccessToken,
  verifyRefreshToken,
  isTokenValid,
  accessToken
};
