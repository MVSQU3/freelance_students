import { body } from "express-validator";

export const stageSchema = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le titre doit contenir au moins 3 caractères"),

  body("description")
    .notEmpty()
    .withMessage("La description est obligatoire")
    .isLength({ min: 10 })
    .withMessage("La description doit contenir au moins 10 caractères"),

  body("location").notEmpty().withMessage("La localisation est obligatoire"),
];
