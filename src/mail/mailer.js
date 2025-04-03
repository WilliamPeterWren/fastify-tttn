// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",    
  port: 465,              
  secure: true,        
  auth: {
    user: "txphong2010@gmail.com",
    pass: "fsjw arns rghy iagk", 
  },
});

async function sendOTP(email, code) {
  await transporter.sendMail({
    from: '"Fastify PT" <txphong2010@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${code}`,
  });
};

async function warningLogin(email) {
  await transporter.sendMail({
    from: '"Fastify PT" <txphong2010@gmail.com>',
    to: email,
    subject: "Warning login",
    html: `<p>You logged in a strange device. if it was you, ignore this email.</p>
    <p>Please contact: <b>0982105525</b> for more information</p>`,
  });
};

async function verifyEmail(email, verifyLink){
  await transporter.sendMail({
    from: '"Fastify PT" <txphong2010@gmail.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Click vào đây để xác minh email: <a href="${verifyLink}">${verifyLink}</a></p>`
  });
}

async function verifyPassword(email, otp){
  await transporter.sendMail({
    from: '"Fastify PT" <txphong2010@gmail.com>',
    to: email,
    subject: "OTP Reset Password",
    text: `OTP reset password: ${otp}`,
  });
}

async function sendPassword(email, password){
  await transporter.sendMail({
    from: '"Fastify PT" <txphong2010@gmail.com>',
    to: email,
    subject: "New password",
    html: `<p>Your new Password: </p><h2>${password}</h2>`
  });
}

module.exports = { 
  sendOTP, 
  warningLogin, 
  verifyEmail, 
  verifyPassword, 
  sendPassword 
};
