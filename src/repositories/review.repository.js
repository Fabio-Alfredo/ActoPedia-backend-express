import Review from "../models/reviews.model.js";

export const createRevew = async (review, opts) => {
  const newReview = new Review(review);
  return await newReview.save(opts);
};

export const updateReview = async (reviewId, review, opts) => {
  return await Review.findByIdAndUpdate(
    { _id: reviewId },
    review,
    { new: true },
    opts
  );
};

export const findReviewById = async (reviewId) => {
  return await Review.findById(reviewId);
};
