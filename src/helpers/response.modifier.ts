import { Response } from "express";

interface ApiResponse<T> {
  message: string;
  result: T;
}

export const sendResponse = <T>(
  res: Response,
  result: T,
  status = 200,
  message = "Success"
): Response<ApiResponse<T>> => {
  const response: ApiResponse<T> = {
    message,
    result,
  };
  return res.status(status).json(response);
};
