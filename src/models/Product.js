const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true, index: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    details: { type: String },
    product_images: [{ url: String }],  
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' },  
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    stock: { type: Number, required: true, min: 0, index: true },  
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],  
    created_at: { type: Date, default: Date.now },
});

productSchema.methods.updatePrice = async function (newPrice) {
    const Price = mongoose.model('Price');

    // Find the last price entry for this product
    const lastPrice = await Price.findOne({ product: this._id }).sort({ created_at: -1 });

    // If the price hasn't changed, return the existing entry
    if (lastPrice && lastPrice.price === newPrice) {
        return lastPrice; 
    }

    // Create a new price entry
    const newPriceEntry = await Price.create({ product: this._id, price: newPrice });

    // Update latest_price reference in Product schema
    // this.latest_price = newPriceEntry._id;
    // await this.save();

    return newPriceEntry;
};

productSchema.methods.getPriceHistory = async function () {
    const Price = mongoose.model('Price');
    return await Price.find({ product: this._id }).sort({ created_at: -1 });
};

productSchema.methods.getTypes = async function () {
    const ProductType = mongoose.model('ProductType'); // Ensure this model exists
    return await ProductType.find({ product: this._id }).populate('type');
};

module.exports = mongoose.model('Product', productSchema);
