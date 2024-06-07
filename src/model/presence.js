import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Employee } from "./employee.js";
import { PresenceType } from "./presenceType.js";

const Presence = sequelize.define(
  "Presence",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nik: {
      type: DataTypes.STRING(20),
      references: {
        model: Employee,
        key: "nik",
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    presence_type: {
      type: DataTypes.INTEGER,
      references: {
        model: PresenceType,
        key: "id",
      },
    },
    check_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out: {
      type: DataTypes.DATE,
    },
    pict: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    coordinate: {
      type: DataTypes.GEOMETRY("POINT", 4326),
    },
  },
  {
    tableName: "presences",
    timestamps: false,
  }
);

Employee.hasMany(Presence, { foreignKey: "nik" });
Presence.belongsTo(Employee, { foreignKey: "nik" });

PresenceType.hasMany(Presence, { foreignKey: "presence_type" });
Presence.belongsTo(PresenceType, { foreignKey: "presence_type" });

export { Presence };
