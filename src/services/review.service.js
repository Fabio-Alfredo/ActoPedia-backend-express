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
