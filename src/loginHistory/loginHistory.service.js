const LoginHistory = require('../models/LoginHistory');
const UAParser = require('ua-parser-js');
const { warningLogin } = require('../mail/mailer');


exports.traceHistory = async (user, request) => {
  try {
    const userAgent = request?.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const ua = parser.getResult();
    const ip = request?.headers['x-forwarded-for'] || request.ip;
    const device = ua.device?.type || 'desktop';

    const lastLogin = await LoginHistory.findOne({ user_id: user._id }).sort({ login_at: -1 });

    const isSameAsLast = lastLogin &&
      lastLogin.ip === ip &&
      lastLogin.device === device;

    if (!isSameAsLast) {
      await LoginHistory.create({
        user_id: user._id,
        ip,
        user_agent: userAgent,
        browser: ua.browser?.name || '',
        os: ua.os?.name || '',
        device,
        login_at: new Date()
      });

      if (lastLogin) {
        console.warn(`Cảnh báo: Đăng nhập bất thường cho user: ${user.email}`);
        await warningLogin(user.email);
      }
    }

  } catch (error) {
    console.error('Lỗi xử lý login history:', error);
  }
};
