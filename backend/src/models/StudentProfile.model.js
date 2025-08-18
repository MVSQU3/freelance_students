// models/StudentProfile.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const StudentProfileModel = () => {
  return sequelize.define(
    "StudentProfile",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      school: DataTypes.STRING,
      level: DataTypes.STRING,
      fieldOfStudy: DataTypes.STRING,
      location: DataTypes.STRING,
      availability: DataTypes.STRING,
      visibility: { type: DataTypes.BOOLEAN, defaultValue: true },
      bio: DataTypes.TEXT,
      photoUrl: { type: DataTypes.STRING, defaultValue: "" },
      cvUrl: { type: DataTypes.STRING, defaultValue: "" },
    },
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
