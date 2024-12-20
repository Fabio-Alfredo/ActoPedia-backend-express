import mongoose from "mongoose";
import * as movieRerpository from "../repositories/movie.repository.js";
import * as actorService from "../services/actor.service.js";
import errorCodes from "../utils/errorCodes.util.js";
import { ServiceError } from "../errors/ServiceError.error.js";
import saveImage from "../utils/saveImage.util.js";

export const createMovie = async (movie, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const image = await saveImage(movie.image, "movies");
    if (!image)
      throw new ServiceError("Error saving image", errorCodes.IMAGES.NOT_FOUND);

    movie.image = image;
    const existingMovie = await movieRerpository.findMovieByTitle(movie.title);
    if (existingMovie)
      throw new ServiceError(
        "Movie already exists",
        errorCodes.MOVIE.ALREADY_EXISTS
      );
    movie.createFor = { user: user._id, date: new Date() };
    const newMovie = await movieRerpository.createMovie(movie, opts);
    await session.commitTransaction();
    return newMovie;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while creating movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const addActorToMovie = async (movieId, personajes) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    const movie = await movieRerpository.findMovieById(movieId);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);

    let actors = [];

    for (let i = 0; i < personajes.length; ++i) {
      const actor = await actorService.existingActor(personajes[i].actorId);
      const personajeExists = movie.actors.some(
        (a) =>
          a.actor.toString() === actor._id.toString() &&
          a.personaje === personajes[i].personaje
      );
      if (!personajeExists) {
        await actorService.addMovieInActor(
          actor._id,
          movie._id,
          personajes[i].personaje,
          opts
        );
        actors.push({ actor: actor._id, personaje: personajes[i].personaje });
      }
    }

    const updatedMovie = await movieRerpository.addActors(
      movie._id,
      actors,
      opts
    );
    await session.commitTransaction();
    return updatedMovie;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while adding actor to movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const getMovies = async () => {
  try {
    const movies = await movieRerpository.getMovies();
    return movies;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while getting movies",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  }
};

export const existingMovie = async (movieId) => {
  try {
    const movie = await movieRerpository.findMovieById(movieId);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);

    return movie;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while getting movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  }
};

export const addReviewToMovie = async (movieId, reviewId, opts) => {
  try {
    const movie = await movieRerpository.findMovieById(movieId);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);

    const updateMovie = await movieRerpository.addReview(
      movie._id,
      reviewId,
      opts
    );
    return updateMovie;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while adding review to movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  }
};

export const updateMovie = async (movieId, movie, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };
    if (movie.image) {
      const image = await saveImage(movie.image, "movies");
      if (!image)
        throw new ServiceError(
          "Error saving image",
          errorCodes.IMAGES.NOT_FOUND
        );

      movie.image = image;
    }

    const existingMovie = await movieRerpository.findMovieById(movieId);
    if (!existingMovie)
      throw new ServiceError(
        "Movie not exits",
        errorCodes.MOVIE.MOVIE_NOT_EXISTS
      );

    const updatedMovie = await movieRerpository.updateMovie(
      movieId,
      movie,
      user._id,
      opts
    );
    await session.commitTransaction();
    return updatedMovie;
  } catch (e) {
    await session.abortTransaction();
    throw new ServiceError(
      e.message || "Internal server error while updating movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  } finally {
    await session.endSession();
  }
};

export const deleteReviewInMovie = async (movieId, reviewId, opts) => {
  try {
    const movie = await movieRerpository.findMovieById(movieId);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.NOT_FOUND);

    const updatedMovie = await movieRerpository.deleteReviewInMovie(
      movie._id,
      reviewId,
      opts
    );
    return updatedMovie;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while deleting review in movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  }
}

export const getMovieById = async (movieId) => {
  try {
    const movie = await movieRerpository.findMovieById(movieId);
    if (!movie)
      throw new ServiceError("Movie not found", errorCodes.MOVIE.MOVIE_NOT_EXISTS);

    return movie;
  } catch (e) {
    throw new ServiceError(
      e.message || "Internal server error while getting movie",
      e.code || errorCodes.MOVIE.NOT_FOUND
    );
  }
}