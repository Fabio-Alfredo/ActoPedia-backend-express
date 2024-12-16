import Review from "../models/reviews.model.js";

export const createRevew = async (review) => {
    const newReview = new Review(review);
    return await newReview.save();
}
