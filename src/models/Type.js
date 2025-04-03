const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    type_name: { type: String, required: true, unique: true },  
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Type', typeSchema);
