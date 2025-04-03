const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    name: { type: String, required: true},
    value: { type: Number, required: true},
    
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);
