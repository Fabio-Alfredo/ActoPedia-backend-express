import { Router } from "express";
import * as userCotroller from "../controllers/user.controller.js";
import * as userValidator from "../validators/user.validator.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import runValidation from "../middlewares/validator.middleware.js";
import { config } from "../configs/config.js";

const userRouter = Router();

userRouter.patch(
  "/role/:userId",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_two]),
  userValidator.updateRoleValidator,
  runValidation,
  userCotroller.updateRoleInUser
);

userRouter.patch(
  "/state/:userId",
  authMiddleware.authMiddleware,
  authMiddleware.rolesMiddleware([config.role_two]),
  userValidator.updateStateValidator,
  runValidation,
  userCotroller.updateStateInUser
);

export default userRouter;
