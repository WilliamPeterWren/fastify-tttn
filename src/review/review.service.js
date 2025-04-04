const mongoose = require('mongoose');
const Review = require('../models/Review');
const Product = require('../models/Product'); 

exports.createReview = async (userId, data) => {
    const { comment, rating, product } = data;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid userId');
    }
    if (!mongoose.Types.ObjectId.isValid(product)) {
        throw new Error('Invalid product id');
    }
    if (!comment || typeof comment !== 'string') {
        throw new Error('Comment is required and must be a string');
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new Error('Rating must be an integer between 1 and 5');
    }

    
    // Check if review exists
    const prod = await Product.findById(product);
    if (!prod) {
        throw new Error('Product not found');
    }

    // Create the review
    const newReview = new Review({
        comment,
        rating,
        user: userId,
        product: product, 
    });

    await newReview.save();

    return {
        review: newReview.toObject(),
        message: 'Review created successfully',
        code: 201
    };
};