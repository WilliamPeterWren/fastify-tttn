const mongoose = require('mongoose');

const {createSlug} = require('../utils/user.utils');

const discountSchema = new mongoose.Schema({
    value: { 
        type: Number, 
        required: true, 
        min: 0
    },
    isGlobal: { 
        type: Boolean, 
        default: false
    },
    name: { 
        type: String, 
        required: function() { return this.isGlobal; } 
    },
    slug: {
        type: String, 
        required: true,
        unique: true,
        index: true,
    },
    expires_at: { 
        type: Date
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
});

discountSchema.pre('save', function(next) {
    if (this.isGlobal && !this.slug && this.name) {
        this.slug = createSlug(this.name) + '-' + new Date().getFullYear();
    }
    next();
});

module.exports = mongoose.model('Discount', discountSchema);