const authService = require('./auth.service');
const mail = require('../mail/mailer');
const User = require("../models/User")

exports.verifyPasswordOTP = (fastify) => async (request, reply) => {
  try {
    const { email, otp } = request.body;
    const result = await authService.verifyPasswordOTP(email, otp, fastify);
    reply.status(200).send(result);
  } catch (err) {
    throw new Error(err.message);
  }
}

exports.getOTP = (fastify) => async (request, reply) => {
  try{
    const { email } = request.body;

    const user = await User.findOne({email});
    if (!user) throw fastify.httpErrors.unauthorized("Invalid credentials");

    const otp = authService.generateOTP();
    authService.saveOTP(email, otp);
    await mail.sendOTP(email, otp);

    return reply.send({ message: "OTP sent to email" });
  } catch(err){
    throw fastify.httpErrors.badRequest(err.message);
  }
};

exports.verifyOTP = (fastify) => async (req, reply) => {
  try {
    const { email, otp } = req.body;

    const isValid = mail.verifyOTP(email, otp);
    if (!isValid) return reply.code(400).send({ message: "Invalid or expired OTP" });

    const token = fastify.jwt.sign({ email }); 
    return { token };
  } catch (err) {
    throw new Error(err.message);
  }
};