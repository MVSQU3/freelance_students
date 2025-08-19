import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export const ApplicationModel = () => {
  return sequelize.define(
    "Application",
    {
      coverLetter: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: "updated",
    }
  );
};
