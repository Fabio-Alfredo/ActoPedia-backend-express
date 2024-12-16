import createHttpError from 'http-errors';
import errorCodes from '../utils/errorCodes.util.js';
import *as movieService from '../services/movie.service.js';

export const createMovie = async (req, res, next)=>{
    try{
        const movie = req.body;
        movie.image = req.files[0];
        const newMovie = await movieService.createMovie(movie);
        res.status(201).json(newMovie);
    }catch(e){
        switch(e.code){
            case errorCodes.MOVIE.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            case errorCodes.IMAGES.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            case errorCodes.MOVIE.ALREADY_EXISTS:
                next(createHttpError(409, e.message));
                break;
            default:
                next(e);
        }
    }
}


export const addActorToMovie = async (req, res, next)=>{
    try{
        const movieId = req.params.movieId;
        const {personajes} = req.body;

        const updatedMovie = await movieService.addActorToMovie(movieId, personajes);
         res.status(200).json(updatedMovie);
    }catch(e){
        switch(e.code){
            case errorCodes.MOVIE.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            case errorCodes.ACTOR.NOT_FOUND:
                next(createHttpError(404, e.message));
                break;
            default:
                next(e);
        }
    }
};

export const getMovies = async (req, res, next)=>{
    try{
        const movies = await movieService.getMovies();
        res.status(200).json(movies);
    }catch(e){
        switch(e.code){
            case errorCodes.MOVIE.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}