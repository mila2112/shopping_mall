import { DataTypes as Sequelize } from "sequelize";

const CategoriesModel = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
};

const CategoriesOptions = {
  timestamps: true,
  schema: "public",
  freezeTableName: true,
};

const CategoriesAssociation = (schema) => {
  schema.Categories.hasMany(schema.Products, { foreignKey: "categoryId", as: "products" });
};

export const getModel = (seq) => {
  return seq.define("Categories", CategoriesModel, CategoriesOptions);
};
