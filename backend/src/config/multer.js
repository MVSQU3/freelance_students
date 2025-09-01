import multer from "multer";
import path from "path";
import fs from "fs";

// Assure-toi que le dossier existe
const uploadDir = path.join(process.cwd(), "src/tmp");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Filtre des fichiers autorisés (PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // images
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // ✅ fichier accepté
  } else {
    cb(
      new Error("Format non autorisé. Seuls PDF, DOC et DOCX sont acceptés."),
      false
    );
  }
};

// Export avec limite de taille (exemple : 5 Mo)
export const upload = multer({
  storage,
  dest: "tmp/",
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
