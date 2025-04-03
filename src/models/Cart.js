const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type'},
    quantity: { type: Number },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);
