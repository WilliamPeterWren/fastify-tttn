const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true  },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
        quantity: {type: Number, required: true, min: [1, 'Quantity must be at least 1'],default: 1 },
        added_at: { type: Date, default: Date.now },
    }],
});

cartSchema.index({ user: 1 });

cartSchema.methods.addItem = async function(productId, quantity = 1) {
    const existingItem = this.items.find(item => 
        item.product.toString() === productId.toString()
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        this.items.push({
            product: productId,
            quantity,
        });
    }
    
    return this.save();
};

cartSchema.methods.removeItem = async function(productId) {
    this.items = this.items.filter(item => 
        item.product.toString() !== productId.toString()
    );
    return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);