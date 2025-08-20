import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Email invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  role: z.enum(
    ["student", "company"],
    "Le rôle doit être 'student' ou 'company'"
  ),
});
