// models/User.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const UserModel = () => {
  return sequelize.define(
    "User",
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("student", "company", "admin"),
        allowNull: false,
      },
    },
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
