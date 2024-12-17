import { body, param } from "express-validator";

export const createReview = [
    body("content")
        .exists()
        .withMessage("content is required")
        .isString()
        .withMessage("content must be a string"),
    body("qualification")
        .exists()
        .withMessage("qualification is required")
        .isNumeric()
        .withMessage("qualification must be a number"),
    body("movie")
        .exists()
        .withMessage("movie is required")
        .isMongoId()
        .withMessage("movie must be a valid mongo id"),
];

export const updateReview = [
    param("reviewId")
        .exists()
        .withMessage("reviewId is required")
        .isMongoId()
        .withMessage("reviewId must be a valid mongo id"),
    body("content")
        .optional()
        .isString()
        .withMessage("content must be a string"),
    body("qualification")
        .optional()
        .isNumeric()
        .withMessage("qualification must be a number"),

]