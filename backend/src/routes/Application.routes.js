import express from "express";
import {
  applyToOffer,
  getMyApplications,
  getOfferApplications,
  updateApplicationStatus,
} from "../controllers/Application.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// L'étudiant doit être connecté et avoir le rôle "student"
router.get("/me", auth, getMyApplications);
router.post("/:stageId/apply", auth, applyToOffer);
// L'entreprise doit être connectée et avoir le rôle "company"
router.get("/:stageId/applications", auth, getOfferApplications);
router.put(
  "/:applicationId/status",
  auth,
  updateApplicationStatus
);

export default router;
