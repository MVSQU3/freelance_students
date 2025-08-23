// GET /api/students/:id → profil public
// POST /api/students → créer/modifier son profil
// POST /api/students/:id/skills → ajouter compétences

import express from "express";
import {
  updateProfile,
  addSkill,
  profile,
  removeSkill,
  getAllStudent,
} from "../controllers/ProfileStudent.controller.js";
import { auth } from "../middleware/auth.js";
import { studentSchema } from "../validation/Profile.validator.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.get("/", getAllStudent);
router.get("/:id", profile);
router.put("/", auth, studentSchema, validate, updateProfile);
router.post("/skills/add/", auth, addSkill);
router.delete("/skills/remove/", auth, removeSkill);

export default router;
