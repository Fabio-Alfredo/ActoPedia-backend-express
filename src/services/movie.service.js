import *as movieRerpository from '../repositories/movie.repository.js';
import *as actorService from '../services/actor.service.js';
import errorCodes from '../utils/errorCodes.util.js';
import { ServiceError } from '../errors/ServiceError.error.js';
import saveImage from '../utils/saveImage.util.js';


export const createMovie = async (movie) => {
    try {
        const image = await saveImage(movie.image, 'movies');
        if (!image)
            throw new ServiceError('Error saving image', errorCodes.IMAGES.NOT_FOUND);

        movie.image = image;
        const existingMovie = await movieRerpository.findMovieByTitle(movie.title);
        if (existingMovie)
            throw new ServiceError('Movie already exists', errorCodes.MOVIE.ALREADY_EXISTS);

        const newMovie = await movieRerpository.createMovie(movie);
        return newMovie;
    } catch (e) {
        throw new ServiceError(
            e.message || 'Internal server error while creating movie',
            e.code || errorCodes.MOVIE.NOT_FOUND
        );
    }
}

export const addActorToMovie = async (movieId, actorId, personaje) => {
    try{
        const movie = await movieRerpository.findMovieById(movieId);
        if (!movie)
            throw new ServiceError('Movie not found', errorCodes.MOVIE.NOT_FOUND);

        const actor = await actorService.existingActor(actorId);

        const updateMovie = await movieRerpository.addActor(movie._id, actor._id, personaje);
        await actorService.addMovieInActor(actor._id, movie._id, personaje);
        return updateMovie;

    }catch(e){
        throw new ServiceError(
            e.message || 'Internal server error while adding actor to movie',
            e.code || errorCodes.MOVIE.NOT_FOUND
        );
    }
}

export const getMovies = async ()=>{
    try{
        const movies = await movieRerpository.getMovies();
        return movies;
    }catch(e){
        throw new ServiceError(
            e.message || 'Internal server error while getting movies',
            e.code || errorCodes.MOVIE.NOT_FOUND
        );
    }
}