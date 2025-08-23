// routes/Upload.routes.js
import express from "express";
import { upload } from "../config/multer.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// route pour upload un fichier
router.post("/upload-cv", auth, upload.single("uploadCv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }

  res.json({
    message: "Fichier uploadé avec succès",
    file: req.file,
  });
});

export default router;
