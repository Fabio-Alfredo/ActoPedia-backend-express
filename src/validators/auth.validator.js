import { body, param } from "express-validator";

export const registerValidator = [
  body("username")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .bail(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email is not valid")
    .notEmpty()
    .withMessage("Email is required")
    .bail(),
  body("password")
    .isString()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be between 6 and 20 characters")
    .notEmpty()
    .withMessage("Password is required")
    .bail(),

  body("reviews")
    .optional()
    .isArray()
    .withMessage("Reviews must be an array")
    .isMongoId()
    .withMessage("Review must be a valid mongo id")
    .bail(),
];

export const loginValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Username or email is required")
    .bail(),
  body("password").trim().notEmpty().withMessage("Password is required").bail(),
];

export const updatePasswordValidator = [
  param("userId")
    .exists()
    .withMessage("userId is required")
    .isMongoId()
    .withMessage("userId must be a valid mongo id"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string"),
  body("newPassword")
    .exists()
    .withMessage("newPassword is required")
    .isString()
    .withMessage("newPassword must be a string"),
];

export const recoverPasswordValidator = [
  body("email")
    .isEmail()
    .withMessage("email is invalid")
    .exists()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
];
