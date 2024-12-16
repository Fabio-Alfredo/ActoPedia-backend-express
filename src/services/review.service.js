import * as reviewRepository from "../repositories/review.repository.js";
import * as movieService from "../services/movie.service.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createReview = async (review) => {
  try {
    const newReview = await reviewRepository.createRevew(review);

    const movie = await movieService.existingMovie(review.movie);

    await movieService.addReviewToMovie(movie._id, newReview._id);
    return newReview;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while creating review",
      e.code || errorCodes.REVIEW.NOT_FOUND
    );
  }
};

export const updateReview = async (reviewId, review) => {
    try{
        const existingReview = await reviewRepository.findReviewById(reviewId);
        if(!existingReview)
            throw new ServiceError('Review not existing', errorCodes.REVIEW.REVIEW_NOT_EXISTS);
        if(existingReview.user != review.user)
            throw new ServiceError('User not allowed to update review', errorCodes.REVIEW.NOT_ALLOWED);

        const updatedReview = await reviewRepository.updateReview(reviewId, review);
        return updatedReview;
    }catch(e){
        throw new ServiceError(
            e.message || 'Internal server error while updating review',
            e.code || errorCodes.REVIEW.NOT_FOUND
        );
    }
}