import { populate } from "dotenv";
import Movie from "../models/movie.model.js";

export const createMovie = async (movie, opts) => {
  const newMovie = new Movie(movie);
  return await newMovie.save(opts);
};

export const findMovieByTitle = async (title) => {
  return await Movie.findOne({ title });
};

export const addActors = async (movieId, actors, opts) => {
  return await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { actors } },
    { new: true, opts }
  );
};

export const findMovieById = async (movieId) => {
  return await Movie.findById(movieId);
};

export const getMovies = async () => {
  return await Movie.find()
    .populate("actors.actor", "name")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username email",
      },
      select: "content qualification",
    });
};

export const addReview = async (movieId, reviewId, opts) => {
  return await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { reviews: reviewId } },
    { new: true, opts }
  );
};

export const updateMovie = async (movieId, movie, id, opts) => {
  return await Movie.findByIdAndUpdate(
    { _id: movieId },
    {
      ...movie,
      $push: {
        updateFor: {
          user: id,
          date: Date.now(),
        },
      },
    },
    { new: true, opts }
  );
};
