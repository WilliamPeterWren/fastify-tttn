const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    street: { type: String, required: true },
    ward: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    phone_number: { type: String, required: true },  
    is_default: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Address', addressSchema);
