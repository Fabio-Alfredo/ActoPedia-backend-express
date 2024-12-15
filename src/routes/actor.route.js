import { Router } from "express";
import *as actorController from "../controllers/actor.controller.js";
import runValidation from "../middlewares/validator.middleware.js";


const actorRouter = Router();
actorRouter.post("/create", actorController.createActor);
actorRouter.get("/", actorController.getActors);
actorRouter.put("/:actorId", actorController.updateActor);

export default actorRouter;