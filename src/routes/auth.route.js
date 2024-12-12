import * as UserController from "../controllers/auth.controller.js";
import runValidation from "../middlewares/validator.middleware.js";
import *as authValidator from "../validators/auth.validator.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register",authValidator.registerValidator, runValidation, UserController.register);

export default authRouter;
