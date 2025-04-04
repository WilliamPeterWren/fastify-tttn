const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    payment_type: { type: String },
});

module.exports = mongoose.model('Payment', paymentSchema);
