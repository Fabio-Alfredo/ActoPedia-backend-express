import { body, param } from "express-validator";
import { config } from "../configs/config.js";

export const updateRoleValidator = [
  body("role")
    .exists()
    .withMessage("role is required")
    .isString()
    .withMessage("role must be a string")
    .isIn(config.roles)
    .withMessage("role is invalid"),
  param("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id"),
];
