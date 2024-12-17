import { Router } from "express";
import authRouter from "./auth.route.js";
import actorRouter from "./actor.route.js";
import movieRouter from "./movie.route.js";
import reviewRouter from "./review.route.js";
import userRoute from "./user.route.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/actors", actorRouter);
mainRouter.use("/movies", movieRouter);
mainRouter.use("/reviews", reviewRouter);
mainRouter.use("/users", userRoute);

export default mainRouter;
