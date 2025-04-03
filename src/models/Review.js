const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
