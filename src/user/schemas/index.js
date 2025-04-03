const register = require('./register.schema'); 
const loginSchema = require('./login.schema');
const updatePassword = require('./updatePassword.schema');

module.exports = {
  register,
  loginSchema, 
  updatePassword
}