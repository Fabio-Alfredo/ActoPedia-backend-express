import createHttpError from 'http-errors';
import *as reviewService from '../services/review.service.js';
import errorCodes from '../utils/errorCodes.util.js';

export const createReview = async (req, res, next)=>{
    try{
        const review = req.body;
        const newReview = await reviewService.createReview(review);
        res.status(201).json(newReview);
    }catch(e){
        switch(e.code){
            case errorCodes.REVIEW.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            default:
                next(e);
        }
    }
}