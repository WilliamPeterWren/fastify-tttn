const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  os: { type: String },
  chip: { type: String },
  cpu: { type: Number, required: true, min: 0 },
  gpu: { type: String },
});

module.exports = mongoose.model('Configuration', configurationSchema);
