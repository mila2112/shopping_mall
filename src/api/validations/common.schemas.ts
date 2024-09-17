import { Joi } from "express-validation";

export const validationSchema = {
  addProductSchema: {
    body: Joi.object({
      categoryId: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string(),
      sku: Joi.string()
        .alphanum()
        .length(8)
        .required(),
      price: Joi.number().required(),
    }),
  },
  editProductSchema: {
    params: Joi.object({
      id: Joi.number().required()
    }),
    body: Joi.object({
      data: Joi.object({
        categoryId: Joi.number(),
        title: Joi.string(),
        description: Joi.string(),
        sku: Joi.string()
          .alphanum()
          .length(8),
        price: Joi.number()
      })
    }),
  },
  getProductByIdSchema: {
    params: Joi.object({
      id: Joi.number().required()
    }),
  },
  deleteProductSchema: {
    params: Joi.object({
      id: Joi.number().required()
    }),
  }
};
