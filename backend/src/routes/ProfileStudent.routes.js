// GET /api/students/:id → profil public
// POST /api/students → créer/modifier son profil
// POST /api/students/:id/skills → ajouter compétences

import express from "express";
import {
  updateProfile,
  addSkill,
  profile,
  removeSkill,
} from "../controllers/ProfileStudent.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/:id", profile);
router.put("/:id", auth, updateProfile);
router.post("/skills/add/", auth, addSkill);
router.delete("/skills/remove/", auth, removeSkill);

export default router;
