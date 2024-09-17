import { Request, NextFunction, Response } from "express";

import { productsRepository, ProductsRepository } from "../../repositories/";
import { CommonReq } from "../../types";

import { BaseController } from "./base.controller";

export class ProductsController extends BaseController {
  private productsRepository: ProductsRepository;

  constructor(
    productsRepository: ProductsRepository
  ) {
    super();
    this.productsRepository = productsRepository;
  }

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.productsRepository.createProduct(req.body);
      return this.sendResponse(res, { message: "You have successfully add product" }, 200);
    } catch (error) {
      return next(error);
    }
  }

  editProduct = async (req: CommonReq, res: Response, next: NextFunction) => {
    const transaction = await this.createTransaction();
    try {
      const { id } = req.params;
      const { data } = req.body;

      const product = await this.productsRepository.getProductById(id);

      if(!product) {
        await transaction.rollback();
        return res.status(404).json({ message: "Product not found" });
      }

      await this.productsRepository.editProduct(id, data, transaction);
      await transaction.commit();

      return this.sendResponse(res, { message: "You have successfully edit product" }, 200);
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.productsRepository.getProducts();

      return this.sendResponse(res, result, 200);
    } catch (error) {
      return next(error);
    }
  }

  getProductsById = async (req: CommonReq, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productsRepository.getProductById(id);

      if(!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return this.sendResponse(res, product, 200);
    } catch (error) {
      return next(error);
    }
  }

  deleteProduct = async (req: CommonReq, res: Response, next: NextFunction) => {
    const transaction = await this.createTransaction();
    try {
      const { id } = req.params;

      const product = await this.productsRepository.getProductById(id);

      if(!product) {
        await transaction.rollback();
        return res.status(404).json({ message: "Product not found" });
      }

      await this.productsRepository.deleteProduct(id, transaction);
      await transaction.commit();

      return this.sendResponse(res, { message: "Product deleted successfully" }, 200);
    } catch (error) {
      await transaction.rollback();
      return next(error);
    }
  }

}

export const productsController = new ProductsController(
  productsRepository
);