import { sequelize } from "../config/sequelize.js";

export const StageSkillModel = () => {
  return sequelize.define("StageSkill", {}, { timestamps: false });
};
