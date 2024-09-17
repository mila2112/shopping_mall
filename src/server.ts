import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import { Express } from "express";

import router from "./api/routes";
import { handleError } from "./helpers";

dotenv.config();

export const app: Express = express();
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "20mb" }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);
app.use(handleError);
app.use((req, res) => res.status(404).send({ message: "Page Not Found", status: 404 }));

app.listen(process.env.APP_PORT);