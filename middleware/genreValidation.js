const { body } = require("express-validator");
const { alphaErr, lengthErr, idErr } = require("../helpers/errorValidationMessages");

const validateGenre = [
  body("genreName")
    .trim()
    .notEmpty()
    .withMessage("Genre name is required.")
    .isAlpha("en-US", { ignore: " " })
    .withMessage(alphaErr)
    .isLength({ min: 2, max: 50 })
    .withMessage(lengthErr),
];

const validateGenreId = [
  body("id")
    .notEmpty()
    .withMessage("Genre id is required.")
    .isInt({ min: 1 })
    .withMessage("Genre ID must be a positive integer."),
];

module.exports = {validateGenre, validateGenreId};
