import { Response } from "express";

import db from "../../db/models";
import { sendResponse } from "../../helpers";

export class BaseController {
  public sendResponse: <T>(res: Response, result: T, status?: number, message?: string) => Response;
  constructor() {
    this.sendResponse = sendResponse;
  }

  createTransaction = () => {
    return db.Sequelize.transaction();
  }
}
