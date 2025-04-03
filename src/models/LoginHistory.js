// models/LoginHistory.js
const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip: String,
  user_agent: String,
  browser: String,
  os: String,
  device: String,
  login_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
