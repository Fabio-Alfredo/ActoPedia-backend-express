import { Router } from "express";
import * as actorController from "../controllers/actor.controller.js";
import * as actorValidator from "../validators/actor.validator.js";
import runValidation from "../middlewares/validator.middleware.js";

const actorRouter = Router();
actorRouter.post(
  "/create",
  actorValidator.createActorValidator,
  runValidation,
  actorController.createActor
);

actorRouter.put(
  "/:actorId",
  actorValidator.updateActorValidator,
  runValidation,
  actorController.updateActor
);

actorRouter.get("/", actorController.getActors);

export default actorRouter;
