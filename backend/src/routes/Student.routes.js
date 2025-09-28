// routes/studentRoutes.js
import express from "express";
import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  addSkill,
  removeSkill,
  getMySkills,
} from "../controllers/Student.controller.js";
import { auth } from "../middleware/auth.js";
import { studentSchema } from "../validation/Profile.validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/me/profile", auth, getMyProfile);
router.put("/update/profile", auth, studentSchema, validate, updateMyProfile);
router.get("/me/skills", auth, getMySkills);
router.post("/skills/add", auth, addSkill);
router.delete("/skills/remove", auth, removeSkill);
router.get("/profile/:id", getStudentById);

export default router;
