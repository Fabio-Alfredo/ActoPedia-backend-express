import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";
import * as movieValidator from "../validators/movie.validator.js";
import *as authMiddleware from "../middlewares/auth.middleware.js"
import runValidation from "../middlewares/validator.middleware.js";
import { config } from "../configs/config.js";

const movieRouter = Router();

movieRouter.post(
  "/create",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_one, config.role_two]),
  movieValidator.createMovieValidator,
  runValidation,
  movieController.createMovie
);

movieRouter.put(
  "/:movieId",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_one, config.role_two]),
  movieValidator.updateMovieValidator,
  runValidation,
  movieController.updateMovie
);

movieRouter.put(
  "/addActor/:movieId",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_one, config.role_two]),
  movieValidator.addActorToMovieValidator,
  runValidation,
  movieController.addActorToMovie
);


movieRouter.get("/getMovies", movieController.getMovies);

export default movieRouter;
