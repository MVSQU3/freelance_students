import express from "express";
import {
  createStage,
  getAllStages,
  getStageById,
  updateStage,
  deleteStage,
  searchStages,
} from "../controllers/Stage.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createStage);
router.get("/", getAllStages);
router.get("/search", searchStages);  // 👈 placé avant
router.get("/:id", getStageById);
router.put("/:id", auth, updateStage);
router.delete("/:id", auth, deleteStage);


export default router;
