import { body } from "express-validator";

export const applySchema = [
  body("coverLetter")
    .notEmpty()
    .withMessage("La lettre de motivation est obligatoire"),
];
