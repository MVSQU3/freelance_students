// models/CompanyProfile.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const CompanyProfileModel = () => {
  return sequelize.define(
    "CompanyProfile",
    {
      companyName: DataTypes.STRING,
      sector: DataTypes.STRING,
      location: DataTypes.STRING,
      website: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    { timestamps: true, createdAt: "created", updatedAt: "updated" }
  );
};
