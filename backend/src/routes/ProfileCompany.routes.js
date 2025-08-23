// GET /api/companies/:id → profil public

// POST /api/companies → créer/modifier son profil

import express from "express";
import {
  profile,
  updateProfile,
} from "../controllers/ProfileCompany.controller.js";
import { auth } from "../middleware/auth.js";
import { companySchema } from "../validation/Profile.validator.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.get("/:id", profile);
router.put("/", auth, companySchema, validate, updateProfile);

export default router;
