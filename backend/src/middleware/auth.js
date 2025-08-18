import jwt from "jsonwebtoken";
import { User } from "../config/sequelize.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorize - No Token Provide" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorize - Invalid Token" });
    }

    const user = await User.findByPk(decoded.userId, {
      attributes: ["id", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Erreur in middleware auth", error);
    res
      .status(500)
      .json({ message: "Internal server error", message: error.message });
  }
};
