import { Router } from "express";
import * as UserController from "../controllers/auth.controller.js";
import *as authValidator from "../validators/auth.validator.js";
import runValidation from "../middlewares/validator.middleware.js";

const authRouter = Router();

authRouter.post("/register",authValidator.registerValidator, runValidation, UserController.register);
authRouter.post("/login",authValidator.loginValidator, runValidation,  UserController.login);

export default authRouter;
