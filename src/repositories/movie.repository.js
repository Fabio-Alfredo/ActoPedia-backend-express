import { populate } from "dotenv";
import Movie from "../models/movie.model.js";

export const createMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return await newMovie.save();
};

export const findMovieByTitle = async (title) => {
  return await Movie.findOne({ title });
};

export const addActors = async (movieId, actors) => {
  return await Movie.findByIdAndUpdate({ _id: movieId }, { $addToSet: { actors } }, { new: true });
};

export const findMovieById = async (movieId) => {
  return await Movie.findById(movieId);
};

export const getMovies = async () => {
  return await Movie.find()
    .populate("actors.actor", "name")
    .populate({
        path:"reviews",
        populate:{
            path:"user",
            select:"username email"
        },
        select:"content qualification"
    }
    )
};

export const addReview = async (movieId, reviewId) => {
  return await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { reviews: reviewId } },
    { new: true }
  );
};

export const updateMovie = async (movieId, movie) => {
  return await Movie.findByIdAndUpdate({ _id: movieId }, movie, { new: true });
}