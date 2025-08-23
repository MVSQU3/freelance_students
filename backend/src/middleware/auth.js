import jwt from "jsonwebtoken";
import { Student, Company } from "../config/sequelize.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    let user;
    // Vérifier le rôle pour choisir la table
    if (decoded.role === "student") {
      user = await Student.findByPk(decoded.userId, {
        attributes: ["id", "email", "role"],
      });
    } else if (decoded.role === "company") {
      user = await Company.findByPk(decoded.userId, {
        attributes: ["id", "email", "role"],
      });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Erreur dans middleware auth:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
