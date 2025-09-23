import express from "express";
import {
  createStage,
  getAllStages,
  getStageById,
  updateStage,
  deleteStage,
  searchStages,
  getMyStages,
  lastUploadedStages,
} from "../controllers/Stage.controller.js";
import { auth } from "../middleware/auth.js";
import { stageSchema } from "../validation/Stage.validator.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", auth, stageSchema, validate, createStage);
router.get("/", getAllStages);
router.get("/my-stage", auth, getMyStages);
router.get("/search", searchStages);
router.get("/last-uploaded", lastUploadedStages);
router.get("/:id", getStageById);
router.put("/:id", auth, stageSchema, validate, updateStage);
router.delete("/:id", auth, deleteStage);

export default router;
