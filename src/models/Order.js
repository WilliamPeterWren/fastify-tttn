const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    payment_type: { 
        type: String, 
        enum: ['momo', 'vnpay', 'paypal', 'bank_transfer', 'cash_on_delivery'], 
        default: 'cash_on_delivery',
    },
    order_items: [
        { 
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
            price_at_purchase: { type: Number, required: true, min: 0 },
            discount_at_purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount', default: null },
            quantity: { type: Number, required: true, min: 1 },
        }
    ],
    total_voucher: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    }, 
    estimated_delivery: { type: Date, default: null },
    shipping_address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    created_at: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('Order', orderSchema);
