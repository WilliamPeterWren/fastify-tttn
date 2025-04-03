const loginRateLimitConfig = {
  rateLimit: {
    max: 5,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.headers['x-forwarded-for'] || req.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau 1 phút.',
    }),
    onExceeding: (req) => {
      console.log(`Gần đạt giới hạn: IP ${req.ip}`);
    },
    onExceeded: (req) => {
      console.log(`Bị chặn do quá giới hạn: IP ${req.ip}`);
    },
  },
};

module.exports = loginRateLimitConfig;