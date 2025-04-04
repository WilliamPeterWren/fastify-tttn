const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  backCamera: { type: String, required: true },
  backFilm: { type: [String], default: [] },
  backFlash: {type: Boolean, default: true},
  backFeature: { type: [String], default: [] },

  frontCamera: { type: String, required: true },
  frontFilm: { type: [String], default: [] },
  frontFeature: { type: [String], default: [] },
 
});

module.exports = mongoose.model('Camera', cameraSchema);
