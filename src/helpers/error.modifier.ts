import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";

class BaseError extends Error {
  statusName: string;
  message: string;
  status: number;
  locales?: { [key:string]: any };
  error_code?: string;

  constructor(status: number, statusName: string, message: string, locales?: any, error_code?: string) {
    super();
    this.statusName = statusName;
    this.message = message;
    this.status = status;
    this.locales = locales;
    this.error_code = error_code;
  }
}

export const handleError = (error: BaseError, req: Request, res: Response, next: NextFunction) => {
  try {
    let errInstance;
    if (error instanceof ValidationError) {
      errInstance = new BaseError(error.statusCode || 422, error.name || "VALIDATION_ERROR", error.details[0]);
    } else if (error.name === "SequelizeDatabaseError" || error.stack?.includes("sequelize")) {
      errInstance = new BaseError(418, "I'm a teapot", error.message || "Something went wrong");
    } else {
      errInstance = new BaseError(error.status || 404, error.statusName || "BAD_REQUEST", error.message || "Something went wrong");
    }
    return res.status(errInstance.status || 409).send({ error: errInstance.message, errorName: errInstance.statusName, locales: error.locales, error_code: error.error_code });
  } catch (error) {
    next(error);
  }
};
