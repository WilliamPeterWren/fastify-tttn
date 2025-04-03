const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    value: { type: Number, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Brand', brandSchema);
