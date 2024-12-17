import { Router } from "express";
import * as reviewController from "../controllers/review.controller.js";
import * as reviewValidator from "../validators/review.validator.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import runValidation from "../middlewares/validator.middleware.js";

const reviewRouter = Router();

reviewRouter.post(
  "/create",
  // authMiddleware.authMiddleware,
  reviewValidator.createReview,
  runValidation,
  reviewController.createReview
);

reviewRouter.put(
  "/update/:reviewId",
  authMiddleware.authMiddleware,
  reviewValidator.updateReview,
  runValidation,
  reviewController.updateReview
);

export default reviewRouter;
