import { Request } from "express";

export interface createProductType {
  categoryId: number,
  title: string,
  sku: string,
  price: number,
  description?: string
}

export interface editProductType {
  categoryId?: number,
  title?: string,
  sku?: string,
  price?: number,
  description?: string
}

export type CommonReq = Request & {
  params: { id: number }
}