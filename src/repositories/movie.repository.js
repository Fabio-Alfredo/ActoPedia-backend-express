import Movie from "../models/movie.model";

export const createMovie = async (movie)=>{
    const newMovie = new Movie(movie);
    return newMovie.save();
}


export const findMovieByTitle = async (title)=>{
    return Movie.findOne({title});
}