const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_images: [{ url: String}],  
    details: { type: String },
    slug: { type: String, required: true },
    created_at: { type: Date, default: Date.now },

    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant' }],
    
    battery: { type: mongoose.Schema.Types.ObjectId, ref: 'Battery'},
    camera: { type: mongoose.Schema.Types.ObjectId, ref: 'Camera'},
    configuration: { type: mongoose.Schema.Types.ObjectId, ref: 'Configuration' },
    connection: { type: mongoose.Schema.Types.ObjectId, ref: 'Connection' },
    design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
    memory: { type: mongoose.Schema.Types.ObjectId, ref: 'Memory' },
    screen: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen' },
    utility: { type: mongoose.Schema.Types.ObjectId, ref: 'Utility' },
    
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Product', productSchema);
