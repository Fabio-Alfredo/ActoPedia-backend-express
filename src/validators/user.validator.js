import { body, param } from "express-validator";
import { config } from "../configs/config.js";
import { USER_STATES } from "../utils/constans/statesuser.util.js"

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

export const updateStateValidator = [
  body("state")
    .exists()
    .withMessage("state is required")
    .isString()
    .withMessage("state must be a string")
    .isIn(Object.values(USER_STATES))
    .withMessage("state is invalid"),
  param("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id"),
]

export const updatePasswordValidator = [
  body("password")
    .exists()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isString()
    .withMessage("newPassword must be a string")
]