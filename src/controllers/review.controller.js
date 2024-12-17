import createHttpError from 'http-errors';
import *as reviewService from '../services/review.service.js';
import errorCodes from '../utils/errorCodes.util.js';

export const createReview = async (req, res, next)=>{
    try{
        const review = req.body;
        const user = req.user;
        const newReview = await reviewService.createReview(review, user);
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

export const updateReview = async (req, res, next)=>{
    try{
        const reviewId = req.params.reviewId;
        const review = req.body;
        const user = req.user;
        const updatedReview = await reviewService.updateReview(reviewId, review, user);
        res.status(200).json(updatedReview);
    }catch(e){
        switch(e){
            case errorCodes.REVIEW.NOT_FOUND:
                next(createHttpError(500, e.message));
                break;
            case errorCodes.REVIEW.REVIEW_NOT_EXISTS:
                next(createHttpError(404, e.message));
                break;
            case errorCodes.REVIEW.NOT_ALLOWED:
                next(createHttpError(403, e.message));
                break;
            default:
                next(e);
        }
    }
}