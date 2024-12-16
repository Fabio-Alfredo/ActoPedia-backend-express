import Review from "../models/reviews.model.js";

export const createRevew = async (review) => {
    const newReview = new Review(review);
    return await newReview.save();
}


export const updateReview = async (reviewId, review) => {
    return await Review.findByIdAndUpdate({ _id: reviewId }, review, { new: true });
}

export const findReviewById = async (reviewId) => {
    return await Review.findById(reviewId);
}