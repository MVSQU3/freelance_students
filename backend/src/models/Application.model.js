import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const ApplicationModel = () => {
  return sequelize.define(
    "Application",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      },
      coverLetter: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
