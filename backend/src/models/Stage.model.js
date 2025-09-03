import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const StageModel = () => {
  return sequelize.define(
    "Stage",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      duree: { type: DataTypes.STRING, allowNull: false },
      domain: { type: DataTypes.STRING, allowNull: false },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
