const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  resolution: { type: String, },
  diagonal: {type: String, default: true},
  nits: { type: Number},
  glass: { type: String, required: true },
});

module.exports = mongoose.model('Screen', screenSchema);
