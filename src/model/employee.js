import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Employee = sequelize.define(
  "Employee",
  {
    nik: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    job_role: {
      type: DataTypes.STRING(50),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
  }
);

export { Employee };
