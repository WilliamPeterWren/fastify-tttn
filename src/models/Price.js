const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    price: { type: Number, required: true, min: 0 },
    created_at: { type: Date, default: Date.now, index: true }, 
});

priceSchema.index({ product: 1, created_at: -1 });

module.exports = mongoose.model('Price', priceSchema);
