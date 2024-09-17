import { Transaction } from "sequelize";

import { models } from "../db";
import { ProductsEntity } from "../entities";
import { createProductType, editProductType } from "../types";

import { BaseRepository } from "./base.repository";

export class ProductsRepository extends BaseRepository<ProductsEntity> {

  async createProduct(
    data: createProductType
  ): Promise<ProductsEntity> {
    return this.model.create({
      categoryId: data.categoryId,
      title: data.title,
      sku: data.sku,
      price: data.price,
      description: data.description
    });
  }

  async editProduct(id: number, data: editProductType, transaction: Transaction): Promise<ProductsEntity> {
    return this.model.update({ ...data }, {
      where: {
        id
      },
      transaction
    },);
  }

  async getProducts(): Promise<ProductsEntity> {
    return this.model.findAll();
  }

  async getProductById(id: number): Promise<ProductsEntity> {
    return this.model.findOne({
      where: {
        id,
      },
      include: {
        model: models.Categories,
        as: "category",
      },
    });
  }

  async deleteProduct(id: number, transaction: Transaction): Promise<ProductsEntity> {
    return this.model.destroy({ where: { id }, transaction });
  }
}

export const productsRepository = new ProductsRepository(models.Products);
