// POST /api/auth/register → créer un utilisateur (role student/company)

// POST /api/auth/login → retourne JWT

// GET /api/auth/me → info utilisateur + profil

import express from "express";
import {
  register,
  login,
  logout,
  me,
  check,
} from "../controllers/Auth.controller.js";
import { auth } from "../middleware/auth.js";
import { registerSchema, loginSchema } from "../validation/Auth.validator.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.post("/register", registerSchema, validate, register);
router.post("/login", loginSchema, validate, login);
router.post("/logout", logout);
router.post("/check", auth, check);
router.get("/me", auth, me);

export default router;
