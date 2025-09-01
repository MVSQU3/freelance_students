import express from "express";
import { upload } from "../config/multer.js";
import { auth } from "../middleware/auth.js";
import { supabase } from "../config/upabaseClient.js";

const router = express.Router();

router.post("/cv", auth, upload.single("cv"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // Upload dans Supabase Storage
    const { data, error } = await supabase.storage
      .from("uploads") // nom exact du bucket
      .upload(
        `files/${Date.now()}-${file.originalname}`,
        file.buffer || Buffer.from(file.path)
      );

    if (error) return res.status(500).json({ error: error.message });

    // Récupérer l’URL publique
    const { data: publicUrl } = supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    res.json({ url: publicUrl.publicUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur upload fichier" });
  }
});

export default router;
