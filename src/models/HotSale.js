const mongoose = require('mongoose');

const hotSaleSchema = new mongoose.Schema({
    is_valid: { type: Boolean, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HotSale', hotSaleSchema);
