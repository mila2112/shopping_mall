import * as express from "express";
import { Router } from "express";

const productsRouter = express.Router() as Router;

import { productsController } from "../controllers";
import { validateSchema } from "../validations";

productsRouter.post("/add", validateSchema("addProductSchema"), productsController.addProduct);

productsRouter.put("/edit/:id", validateSchema("editProductSchema"), productsController.editProduct);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:id", validateSchema("getProductByIdSchema"), productsController.getProductsById);

productsRouter.delete("/:id", validateSchema("deleteProductSchema"), productsController.deleteProduct);

export { productsRouter };