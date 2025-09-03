import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const StudentProfileModel = () => {
  return sequelize.define(
    "StudentProfile",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
        defaultValue: "your firstName",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
        defaultValue: "your lastName",
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
        defaultValue: "your School",
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "your level",
      },
      fieldOfStudy: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      availability: {
        type: DataTypes.ENUM("disponible", "indisponible"),
        defaultValue: "disponible",
      },
      is_public: {
        type: DataTypes.ENUM("Oui", "Non"),
        defaultValue: "Oui",
      },
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
