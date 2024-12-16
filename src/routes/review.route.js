import { Router } from 'express';
import *as reviewController from '../controllers/review.controller.js';

const reviewRouter = Router();

reviewRouter.post('/create', reviewController.createReview);
reviewRouter.put('/update/:reviewId', reviewController.updateReview);

export default reviewRouter;