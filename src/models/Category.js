const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('Category', categorySchema);
