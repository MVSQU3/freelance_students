import express from "express";
import { upload } from "../config/multer.js";
import { supabase } from "../config/upabaseClient.js";
import fs from "fs";

const router = express.Router();

// Controller
router.post("/cv", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier reçu" });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const supabaseFilePath = `cv/${Date.now()}_${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(supabaseFilePath, fileBuffer, {
        contentType: req.file.mimetype,
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(supabaseFilePath);

    return res.json({
      message: "Fichier uploadé avec succès",
      data,
      publicUrl: publicData.publicUrl,
    });
  } catch (error) {
    console.error("Erreur upload:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
