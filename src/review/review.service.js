const Review = require("./Review");

exports.createReview = async (data) => {
    return await Review.create(data);
};

exports.getReviewsByProduct = async (productId) => {
    return await Review.find({ product: productId }).populate("user", "name");
};

exports.deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);
    if (!review) throw new Error("Review not found");
    if (review.user.toString() !== userId) throw new Error("Unauthorized");
    return await Review.findByIdAndDelete(reviewId);
};
