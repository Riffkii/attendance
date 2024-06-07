import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "root", "123", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export { sequelize };
