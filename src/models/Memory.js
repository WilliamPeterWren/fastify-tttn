const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  ram: { type: Number },
  storage: { type: Number, required: true, min: 0 },
  available: { type: Number, min: 0 },
  contact: { type: String },
});

module.exports = mongoose.model('Memory', memorySchema);
