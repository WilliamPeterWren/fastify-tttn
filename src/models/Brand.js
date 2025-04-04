const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_name: { type: String, required: true },
    brand_image: { type: String, required: true},
    slug: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Brand', brandSchema);
