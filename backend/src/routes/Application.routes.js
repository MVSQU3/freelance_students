import express from "express";
import {
  applyToOffer,
  deleteApply,
  getMyApplications,
  getOfferApplications,
  updateApplicationStatus,
} from "../controllers/Application.controller.js";
import { auth } from "../middleware/auth.js";
import { applySchema } from "../validation/Apply.validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

// L'étudiant doit être connecté et avoir le rôle "student"
router.get("/me", auth, getMyApplications);
router.post("/:stageId/apply", auth, applySchema, validate, applyToOffer);
router.delete("/delete/:applyId", auth, deleteApply);
// L'entreprise doit être connectée et avoir le rôle "company"
router.get("/:stageId/apply", auth, getOfferApplications);
router.put("/:applicationId/status", auth, updateApplicationStatus);

export default router;
