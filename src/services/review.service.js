import * as reviewRepository from "../repositories/review.repository.js";
import * as movieService from "../services/movie.service.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";

export const createReview = async (review) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const movie = await movieService.existingMovie(review.movie);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);

    const newReview = await reviewRepository.createRevew(review, opts);

    await movieService.addReviewToMovie(movie._id, newReview._id, opts);
    return newReview;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while creating review",
      e.code || errorCodes.REVIEW.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const updateReview = async (reviewId, review) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const existingReview = await reviewRepository.findReviewById(reviewId);
    if (!existingReview)
      throw new ServiceError(
        "Review not existing",
        errorCodes.REVIEW.REVIEW_NOT_EXISTS
      );
    if (existingReview.user != review.user)
      throw new ServiceError(
        "User not allowed to update review",
        errorCodes.REVIEW.NOT_ALLOWED
      );

    const updatedReview = await reviewRepository.updateReview(
      reviewId,
      review,
      opts
    );
    return updatedReview;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating review",
      e.code || errorCodes.REVIEW.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};
