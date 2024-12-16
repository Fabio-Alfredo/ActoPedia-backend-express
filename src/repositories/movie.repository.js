import Movie from "../models/movie.model.js";

export const createMovie = async (movie) => {
  const newMovie = new Movie(movie);
  return await newMovie.save();
};

export const findMovieByTitle = async (title) => {
  return await Movie.findOne({ title });
};

export const addActor = async (movieId, actorId, personaje) => {
  return await Movie.findByIdAndUpdate(
    { _id: movieId },
    { $addToSet: { actors: { actor: actorId, personaje } } },
    { new: true }
  );
};

export const findMovieById = async (movieId) => {
  return await Movie.findById(movieId);
};

export const getMovies = async ()=>{
    return await Movie.find().populate('actors.actor', 'name');
}