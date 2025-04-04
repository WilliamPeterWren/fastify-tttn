const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  capacity: { type: Number, required: true, min: 0 },
  batteryType: { type: String, enum: ['Li-ion', 'Li-Po', 'NiMH', 'Lead-Acid'], required: true },
  maximumCharge: { type: Number, min: 0 },
  chargeIncluded: { type: Number, min: 0 },
  technology: { type: [String], default: [] }
});

module.exports = mongoose.model('Battery', batterySchema);
