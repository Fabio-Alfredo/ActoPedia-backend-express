import { Router } from "express";
import authRouter from "./auth.route.js";
import actorRouter from "./actor.route.js";
import movieRouter from "./movie.route.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/actors', actorRouter);
mainRouter.use('/movies', movieRouter);

export default mainRouter;
