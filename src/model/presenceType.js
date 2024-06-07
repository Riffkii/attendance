import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const PresenceType = sequelize.define(
  "PresenceType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "presence_types",
    timestamps: false,
  }
);

export { PresenceType };
