const mongoose = require('mongoose');

const utilitySchema = new mongoose.Schema({
  advanceSecure: { type: [String], default: [] },
  specialFeature: { type: [String], default: [] },
  ip: {type: String,},
  record: { type: [String], default: [] },
  film: { type: [String], default: [] },
  music: { type: [String], default: [] },
});

module.exports = mongoose.model('Utility', utilitySchema);
