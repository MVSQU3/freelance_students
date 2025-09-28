// models/StudentSkill.js
import { sequelize } from "../config/sequelize.js";

export const StudentSkillModel = () => {
  return sequelize.define(
    "StudentSkill",
    {},
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
