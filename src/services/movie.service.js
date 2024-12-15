import *as movieRerpository from '../repositories/movie.repository';
import errorCodes from '../utils/errorCodes.util';
import { ServiceError } from '../errors/ServiceError.error';
import saveImage from '../utils/saveImage.util';


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