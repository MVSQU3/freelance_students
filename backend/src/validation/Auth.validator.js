import { body } from "express-validator";

export const registerSchema = [
  body("email").isEmail().withMessage("Email invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  body("role")
    .isIn(["company", "student"])
    .withMessage("Le rôle doit être 'company' ou 'student'"),
];

export const loginSchema = [
  body("email").isEmail().withMessage("Email invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];
