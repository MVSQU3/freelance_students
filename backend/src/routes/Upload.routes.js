// routes/Upload.routes.js
import express from "express";
import { upload } from "../config/multer.js";

const router = express.Router();

// route pour upload un fichier
router.post("/profile-picture", upload.single("profilePicture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier reçu" });
  }

  res.json({
    message: "Fichier uploadé avec succès",
    file: req.file,
  });
});

export default router;
