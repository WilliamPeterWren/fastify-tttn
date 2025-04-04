const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = require('../models/Cart');
const { createSlug } = require('../utils/user.utils');

exports.addToCart = async (userId, product, quantity) => {
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(product)) {
        throw new Error('Invalid userId or product ID');
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error('Quantity must be a positive integer');
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [{ product, quantity }]
        });
    } else {
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === product.toString()
        );
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
    }

    return await cart.save();
};

exports.getAllCarts = async (userId, page = 1, limit = 10) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
    }
    if (!Number.isInteger(page) || page < 1) {
        throw new Error('Page must be a positive integer');
    }
    if (!Number.isInteger(limit) || limit < 1) {
        throw new Error('Limit must be a positive integer');
    }

    const cart = await Cart.findOne({ user: userId }).select('-__v').lean();
    if (!cart) {
        throw new Error('Cart not found for this user');
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = cart.items.slice(startIndex, endIndex);

    const totalItems = cart.items.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        cart: {
            _id: cart._id,
            // user: cart.user,
            items: paginatedItems
        },
        pagination: {
            page,
            limit,
            totalItems,
            totalPages,
            hasNext: page < totalPages,
            hasPrevious: page > 1
        }
    };
};

exports.update = async (cartId, data) => {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        throw new Error('Invalid cartId');
    }
    const { product, quantity } = data;
    if (!mongoose.Types.ObjectId.isValid(product)) {
        throw new Error('Invalid product ID');
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        throw new Error('Quantity must be a non-negative integer');
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === product.toString()
    );

    if (quantity > 0) {
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            cart.items.push({ product, quantity });
        }
    } else if (quantity === 0) {
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        }
    }

    await cart.save();
    return cart;
};

exports.remove = async (cartId, product) => {
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        throw new Error('Invalid cartId');
    }
    if (!mongoose.Types.ObjectId.isValid(product)) {
        throw new Error('Invalid product ID');
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === product.toString()
    );

    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
    } else {
        throw new Error('Product not found in cart');
    }

    await cart.save();
    return cart;
};