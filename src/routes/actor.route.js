import { Router } from "express";
import * as actorController from "../controllers/actor.controller.js";
import * as actorValidator from "../validators/actor.validator.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import runValidation from "../middlewares/validator.middleware.js";
import { config } from "../configs/config.js";

const actorRouter = Router();
actorRouter.post(
  "/create",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_one, config.role_three]),
  actorValidator.createActorValidator,
  runValidation,
  actorController.createActor
);

actorRouter.put(
  "/:actorId",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_one, config.role_three]),
  actorValidator.updateActorValidator,
  runValidation,
  actorController.updateActor
);

actorRouter.get("/", actorController.getActors);

export default actorRouter;
