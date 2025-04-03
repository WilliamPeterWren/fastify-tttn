// googleService.js

const User = require('../models/User')
const tokenService = require('../token/token.service');
const loginHistory = require('../loginHistory/loginHistory.service')

exports.login = async(fastify, request) => {
  const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
  const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${token.token.access_token}`,
    },
  }).then(res => res.json());

  const { email } = userInfo;
  let user = await User.findOne({ email });

  if (!user) {
    user = new User({
      email,
      password: null,
      roles: ['CUSTOMER'],
      is_active: true,
      is_verified: true,
      auth_type: 'google',
      last_login: new Date(),
      created_at: new Date()
    });
    await user.save();
  } else {
    user.last_login = new Date();
    await user.save();
  }

  request.session.user = {
    _id: user._id,
    email: user.email,
    roles: user.roles,
  };

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
}