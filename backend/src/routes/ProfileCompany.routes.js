// GET /api/companies/:id → profil public

// POST /api/companies → créer/modifier son profil

import express from "express";
import {
  profile,
  updateProfile,
} from "../controllers/ProfileCompany.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", profile);
router.put("/:id", auth, updateProfile);

export default router;
