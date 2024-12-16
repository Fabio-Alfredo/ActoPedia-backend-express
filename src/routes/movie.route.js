import { Router } from "express";
import * as movieController from "../controllers/movie.controller.js";
import * as movieValidator from "../validators/movie.validator.js";
import runValidation from "../middlewares/validator.middleware.js";

const movieRouter = Router();

movieRouter.post(
  "/create",
  movieValidator.createMovieValidator,
  runValidation,
  movieController.createMovie
);

movieRouter.put(
  "/addActor/:movieId",
  movieValidator.addActorToMovieValidator,
  runValidation,
  movieController.addActorToMovie
);
movieRouter.get("/getMovies", movieController.getMovies);

export default movieRouter;
