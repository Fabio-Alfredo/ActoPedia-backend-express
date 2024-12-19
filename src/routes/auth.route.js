import { Router } from "express";
import * as userController from "../controllers/auth.controller.js";
import * as authValidator from "../validators/auth.validator.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import runValidation from "../middlewares/validator.middleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidator.registerValidator,
  runValidation,
  userController.register
);
authRouter.post(
  "/login",
  authValidator.loginValidator,
  runValidation,
  userController.login
);
authRouter.patch(
  "/password",
  authMiddleware.authMiddleware,
  authValidator.updatePasswordValidator,
  runValidation,
  userController.updatePasswordInUser
);


export default authRouter;
