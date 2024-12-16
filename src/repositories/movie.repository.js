import Movie from "../models/movie.model.js";

export const createMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return newMovie.save();
};

export const findMovieByTitle = async (title) => {
  return Movie.findOne({ title });
};

export const addActor = async (movieId, actorId, personaje) => {
  return Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { actors: { actor: actorId, personaje } } },
    { new: true }
  );
};

export const findMovieById = async (movieId) => {
  return Movie.findById(movieId);
};
