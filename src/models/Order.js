const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    order_items: [
        { 
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },  
            price_at_purchase: { type: Number, required: true, min: 0 },
            discount_at_purchase: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount', default: null },
            quantity: { type: Number, required: true, min: 1 },
        }
    ],
    total_voucher: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    }, 
    estimated_delivery: { type: Date, default: null },

    shipping_address: {
        full_name: { type: String, required: true },  
        street: { type: String, required: true },
        ward: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        phone_number: { type: String, required: true },  
    },

    created_at: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('Order', orderSchema);
