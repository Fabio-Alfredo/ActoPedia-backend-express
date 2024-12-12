import { Router } from "express";
import *as actorController from "../controllers/actor.controller.js";
import runValidation from "../middlewares/validator.middleware.js";


const actorRouter = Router();
actorRouter.post("/create", actorController.createActor);

export default actorRouter;