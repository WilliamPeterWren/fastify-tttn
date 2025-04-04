const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  design: { type: String },
  material: { type: String },
  sizeWeight: {type: String},
  firstRelease: { type: String },
});

module.exports = mongoose.model('Design', designSchema);
