const express = require("express");
const router = express.Router();
const { createReview, getReviewsByProduct, deleteReview } = require("./reviewController");

router.post("/review", { preHandler: [fastify.authenticate] }, createReview);
router.get("/review/:productId", getReviewsByProduct);
router.delete("/review/:reviewId", { preHandler: [fastify.authenticate] }, deleteReview);

module.exports = router;