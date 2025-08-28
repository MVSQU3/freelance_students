import express from "express";
import {
  getCompanyById,
  getMyProfile,
  updateProfile,
} from "../controllers/Company.controller.js";
import { auth } from "../middleware/auth.js";
import { companySchema } from "../validation/Profile.validator.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.get("/me/profile", auth, getMyProfile);
router.put("/update/profile", auth, companySchema, validate, updateProfile);
router.get("/public/profile/:id", getCompanyById);

export default router;