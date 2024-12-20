import { body } from "express-validator";

export const createActorValidator = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .bail(),
  body("age").isNumeric().notEmpty().withMessage("Age is required").bail(),
  body("biography")
    .isString()
    .notEmpty()
    .withMessage("Biography is required")
    .bail(),
];

export const updateActorValidator = [
  body("name")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .bail(),
  body("age")
    .optional()
    .isNumeric()
    .notEmpty()
    .withMessage("Age is required")
    .bail(),
  body("biography")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Biography is required")
    .bail(),
];

export const getActorValidator = [
  body("actorId")
    .notEmpty()
    .withMessage("Actor id is required")
    .isMongoId()
    .withMessage("Actor id must
];