// routes/studentRoutes.js
import express from "express";
import {
  getAllStudents,
  getStudentById,
  getMyProfile,
  updateMyProfile,
  addSkill,
  removeSkill,
} from "../controllers/Student.controller.js";
import { auth } from "../middleware/auth.js";
import { studentSchema } from "../validation/Profile.validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/me", auth, getMyProfile);
router.put("/update", auth, studentSchema, validate, updateMyProfile);
router.post("/skills/add", auth, addSkill);
router.delete("/skills/remove", auth, removeSkill);
router.get("/:id", getStudentById);

export default router;