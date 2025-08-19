import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.model.js";
import { CompanyProfileModel } from "../models/CompanyProfile.model.js";
import { StudentProfileModel } from "../models/studentProfile.model.js";
import { SkillModel } from "../models/Skill.model.js";
import { StudentSkillModel } from "../models/StudentSkill.model.js";
import { StageModel } from "../models/Stage.model.js";
import { ApplicationModel } from "../models/Application.model.js";
import setupAssociations from "../models/association/association.js";
import { seed } from "../seed/seed.js";
export const sequelize = new Sequelize("freelance_students", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

// Initialiser tous les modèles
export const User = UserModel(sequelize);
export const CompanyProfile = CompanyProfileModel(sequelize);
export const StudentProfile = StudentProfileModel(sequelize);
export const Skill = SkillModel(sequelize);
export const StudentSkill = StudentSkillModel(sequelize);
export const Stage = StageModel(sequelize);
export const Application = ApplicationModel(sequelize);

// Mettre tous les modèles dans un objet db
const db = {
  sequelize,
  Stage,
  Sequelize,
  User,
  CompanyProfile,
  StudentProfile,
  Skill,
  StudentSkill,
  Application,
};

// Initialisation DB
export const InitDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la DB réussie !");

    setupAssociations(db);

    await sequelize.sync({ force: true });
    console.log("DB synchronisée !");

    await seed();
  } catch (error) {
    console.error("Erreur de connexion à la DB:", error);
  }
};
