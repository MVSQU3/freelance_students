import { body } from "express-validator";

export const companySchema = [
  body("companyName")
    .notEmpty()
    .withMessage("Le nom de l'entreprise est obligatoire")
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères"),

  body("sector").notEmpty().withMessage("Le secteur est obligatoire"),

  body("location").notEmpty().withMessage("La localisation est obligatoire"),

  body("website")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Le site web doit être une URL valide"),

  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La description ne doit pas dépasser 500 caractères"),
];

export const studentSchema = [
  body("firstName")
    .notEmpty()
    .withMessage("Le prénom est obligatoire")
    .isLength({ min: 2 })
    .withMessage("Le prénom doit contenir au moins 2 caractères"),

  body("lastName")
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 2 })
    .withMessage("Le nom doit contenir au moins 2 caractères"),

  body("school").notEmpty().withMessage("L'école est obligatoire"),

  body("level").notEmpty().withMessage("Le niveau est obligatoire"),

  body("fieldOfStudy")
    .notEmpty()
    .withMessage("Le domaine d'étude est obligatoire"),

  body("location").notEmpty().withMessage("La localisation est obligatoire"),

  body("availability")
    .isIn(["Disponible", "Indisponible"])
    .withMessage("La disponibilité doit être 'disponible' ou 'indisponible'"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La bio ne doit pas dépasser 500 caractères"),
];
