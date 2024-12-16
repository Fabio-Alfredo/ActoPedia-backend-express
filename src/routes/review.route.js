import { Router } from 'express';
import *as reviewController from '../controllers/review.controller.js';

const reviewRouter = Router();

reviewRouter.post('/create', reviewController.createReview);

export default reviewRouter;