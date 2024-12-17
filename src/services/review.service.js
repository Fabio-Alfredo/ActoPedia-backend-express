import mongoose from "mongoose";
import * as reviewRepository from "../repositories/review.repository.js";
import * as movieService from "../services/movie.service.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";
import { config } from "../configs/config.js";

export const createReview = async (review, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const movie = await movieService.existingMovie(review.movie);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);
    review.user = user._id;
    const newReview = await reviewRepository.createRevew(review, opts);

    await movieService.addReviewToMovie(movie._id, newReview._id, opts);
    await session.commitTransaction();
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

export const updateReview = async (reviewId, review, user) => {
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
    if (existingReview.user != user._id.toString())
      throw new ServiceError(
        "User not allowed to update review",
        errorCodes.REVIEW.NOT_ALLOWED
      );

    const updatedReview = await reviewRepository.updateReview(
      reviewId,
      review,
      opts
    );
    await session.commitTransaction();
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

export const deleteReview = async (reviewId, user) => {
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
    if (
      existingReview.user != user._id.toString() &&
      !user.roles.includes(config.role_one)
    )
      throw new ServiceError(
        "User not allowed to delete review",
        errorCodes.REVIEW.NOT_ALLOWED
      );
    await movieService.deleteReviewInMovie(
      existingReview.movie,
      reviewId,
      opts
    );
    await reviewRepository.deleteReview(reviewId, opts);
    await session.commitTransaction();
    return existingReview;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while deleting review",
      e.code || errorCodes.REVIEW.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};
