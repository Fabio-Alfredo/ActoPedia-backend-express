import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authValidator from "../validators/auth.validator.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import runValidation from "../middlewares/validator.middleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  authValidator.registerValidator,
  runValidation,
  authController.register
);
authRouter.post(
  "/login",
  authValidator.loginValidator,
  runValidation,
  authController.login
);
authRouter.patch(
  "/password/:userId",
  authMiddleware.authMiddleware,
  authValidator.updatePasswordValidator,
  runValidation,
  authController.updatePasswordInUser
);

authRouter.post(
  "/recover-password",
  authValidator.recoverPasswordValidator,
  runValidation,
  authController.recoverPassword
);


export default authRouter;
