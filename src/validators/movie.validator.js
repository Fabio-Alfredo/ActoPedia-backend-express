import { body, param } from "express-validator";

export const createMovieValidator = [
  body("title")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Title is required")
    .bail(),
  body("director")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Director is required")
    .bail(),
  body("description")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .bail(),
  body("year").isNumeric().notEmpty().withMessage("Year is required").bail(),
  body("genero").isString().notEmpty().withMessage("Genero is required").bail(),
];

export const addActorToMovieValidator = [
  param("movieId")
    .notEmpty()
    .withMessage("Movie id is required")
    .isMongoId()
    .withMessage("Movie id must be a valid mongo id")
    .bail(),
  body("actorId")
    .notEmpty()
    .withMessage("Actor id is required")
    .isMongoId()
    .withMessage("Actor id must be a valid mongo id")
    .bail(),
  body("personaje")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Personaje is required")
    .bail(),
];
