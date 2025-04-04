const mongoose = require('mongoose');

const { createSlug } = require('../utils/user.utils');

const hotSaleSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, index: true },
    discount: { 
        value: {type: Number, required: true, min: 0, max: 100 }, 
        type: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' } 
    },
    is_valid: { type: Boolean, default: true},
    products: [{  type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    start_date: { type: Date, required: true },
    end_date: { type: Date,  required: true, 
        validate: {
            validator: function(value) {
                return this.start_date < value;
            },
            message: 'end_date must be after start_date'
        }
    },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

hotSaleSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    if (!this.slug && this.name) {
        this.slug = createSlug(this.name) + '-' + new Date(this.start_date).getFullYear();
    }
    next();
});

hotSaleSchema.index({ start_date: 1, end_date: 1, is_valid: 1 });

module.exports = mongoose.model('HotSale', hotSaleSchema);