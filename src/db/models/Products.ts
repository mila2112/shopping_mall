import { DataTypes as Sequelize } from "sequelize";

const ProductsModel = {
  id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: {
        tableName: "Categories",
      },
      key: "id",
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  sku: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [8, 8]
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
};

const ProductsOptions = {
  timestamps: true,
  schema: "public",
  freezeTableName: true,
};

const ProductsAssociation = (schema) => {
  schema.Products.belongsTo(schema.Categories, { foreignKey: "categoryId", as: "category" });
};


export const getModel = (seq) => {
  const model = seq.define("Products", ProductsModel, ProductsOptions);
  model.associate = ProductsAssociation;
  return model;
};
