const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: String, required: true },
    storage: { type: Number, required: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },
    stock: { type: Number, required: true, min: 0 },
    sku: { type: String, required: true, unique: true }, 
    created_at: { type: Date, default: Date.now },
});

const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);

module.exports = ProductVariant;
