// rateLimit.js
import rateLimit from "express-rate-limit";

// Limite toutes les requêtes à 100 requêtes par IP toutes les 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requêtes par fenêtre
  standardHeaders: true, // renvoie les headers RateLimit
  legacyHeaders: false, // désactive X-RateLimit-* headers
  message: {
    success: false,
    message: "Trop de requêtes venant de cette IP, réessayez plus tard",
  },
});
