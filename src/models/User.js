const mongoose = require('mongoose');

const Roles = Object.freeze({
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  SHIPPER: 'SHIPPER',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
  ACCOUNTANT: 'ACCOUNTANT',
  MANAGER: 'MANAGER',
  SUPERVISOR: 'SUPERVISOR',
  TECHNICIAN: 'TECHNICIAN',
  MARKETING: 'MARKETING',
  HR: 'HR',
  CUSTOMERSERVICE: 'CUSTOMERSERVICE',
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { 
    type: String, 
    required: function () { 
      return this.auth_type === 'local'; 
    }, 
    default: null 
  },
  roles: { type: [String], enum: Object.values(Roles), default: [Roles.CUSTOMER] },
  is_active: { type: Boolean, default: true },
  is_verified: { type: Boolean, default: false },
  auth_type: { type: String, enum: ['local', 'google'], default: 'local' },
  last_login: { type: Date, default: null }, 
  created_at: { type: Date, default: Date.now },
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
