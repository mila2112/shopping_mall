import * as fs from "fs";
import * as path from "path";
import { Sequelize } from "sequelize";

import dbConfig from "../configs";

type DB = {
  [key: string]: any;
  Sequelize?: Sequelize;
};

const baseName = path.basename(__filename);
const db: DB = {};

const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: Number(dbConfig.port),
  dialect: dbConfig.dialect,
  dialectOptions: {
    useUTC: false,
  },
  logging: dbConfig.logging,
});

fs.readdirSync(__dirname)
  .filter((file) => !file.startsWith(".") && file !== baseName && (file.endsWith(".ts") || file.endsWith(".js")))
  .forEach((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getModel } = require(path.join(__dirname, file));
    const model = getModel(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => console.log("PostgresSQL: Database is connected"))
  .catch((err) => {
    throw err;
  });

db.Sequelize = sequelize;

export default db;
