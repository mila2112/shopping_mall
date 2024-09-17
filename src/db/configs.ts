import { Dialect } from "sequelize";


export default {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  dialect: "postgres" as Dialect,
  logging: process.env.ENVIRONMENT !== "PROD",
};
