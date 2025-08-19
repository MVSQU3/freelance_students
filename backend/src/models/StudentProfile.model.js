import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const StudentProfileModel = () => {
  return sequelize.define(
    "StudentProfile",
    {
      firstName: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      lastName: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      school: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      level: { type: DataTypes.STRING, allowNull: false },
      fieldOfStudy: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      availability: { type: DataTypes.BOOLEAN, defaultValue: true },
      visibility: { type: DataTypes.BOOLEAN, defaultValue: true },
      bio: { type: DataTypes.TEXT },
      photoUrl: { type: DataTypes.STRING },
      cvUrl: { type: DataTypes.STRING },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
