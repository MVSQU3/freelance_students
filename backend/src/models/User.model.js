// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

// User.model.js
export const UserModel = () => {
  return sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "Email invalide" },
          notEmpty: { msg: "Email requis" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [6, 100], msg: "Mot de passe trop court" },
        },
      },
      role: {
        type: DataTypes.ENUM("student", "company"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["student", "company"]],
            msg: "Rôle invalide",
          },
        },
      },
    },
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
