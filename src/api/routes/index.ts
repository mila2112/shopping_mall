import * as dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config();
import { productsRouter } from "./products.router";

const app: Express = express();

app.use("/products", productsRouter);

export default app;
