import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const CompanyProfileModel = () => {
  return sequelize.define(
    "CompanyProfile",
    {
      companyName: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
      sector: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      website: { type: DataTypes.STRING, validate: { isUrl: true } },
      description: { type: DataTypes.TEXT },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
