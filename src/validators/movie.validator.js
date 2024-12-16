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
  body("personajes")
  .isArray({ min: 1 })
    .withMessage("Actors must be an array")
    .bail()
    .custom((personajes) => {
        for(let actor of personajes){
            if(!actor.actorId || !actor.personaje){
                throw new Error("Actor id and personaje are required");
            }
            if(typeof actor.actorId !== "string" || typeof actor.personaje !== "string"){
                throw new Error("Actor id and personaje must be strings");
            }
            if (!/^[0-9a-fA-F]{24}$/.test(actor.actorId)) {
                throw new Error("Each 'actorId' must be a valid Mongo ID");
              }
        }
        return true;
    })
];
