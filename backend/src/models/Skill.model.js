// models/Skill.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const SkillModel = () => {
  return sequelize.define(
    "Skill",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
