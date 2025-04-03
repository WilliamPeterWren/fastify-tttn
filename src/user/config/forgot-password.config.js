const forgotPasswordRateLimitConfig = {
  rateLimit: {
    max: 3,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.headers['x-forwarded-for'] || req.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Bạn đã yêu cầu quên mật khẩu quá nhiều lần. Vui lòng thử lại sau 1 phút.',
    }),
  },
};

module.exports = forgotPasswordRateLimitConfig;