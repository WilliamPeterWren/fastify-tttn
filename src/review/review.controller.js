const reviewService = require("./reviewService");

exports.createReview = async (req, res) => {
    try {
        const review = await reviewService.createReview({
            user: req.user.id,
            product: req.body.product,
            rating: req.body.rating,
            comment: req.body.comment,
        });
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await reviewService.getReviewsByProduct(req.params.productId);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.reviewId, req.user.id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};