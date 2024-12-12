import { Router } from "express";
import authRouter from "./auth.route.js";
import actorRouter from "./actor.route.js";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/actors', actorRouter);

export default mainRouter;
