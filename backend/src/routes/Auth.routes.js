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
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/check", auth, check);
router.get("/me", auth, me);

export default router;
