const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  mobile: { type: [String], default: [] },
  sim: { type: String },
  wifi: {type: [String], default: []},
  gps: { type: [String], default: [] },
  bluetooth: { type: [String], default: [] },
  chargePort: { type: String },
  jack: { type: String },
  anotherPort: {type: [String], default:[]},
});

module.exports = mongoose.model('Connection', connectionSchema);
