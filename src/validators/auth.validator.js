import { body } from "express-validator";

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
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail(),
]