const Router = require("@koa/router");
const productService = require("../service/product");
const Joi = require("joi");
const validate = require("./_validation.js");

const getAllProducts = async (ctx) => {
  ctx.body = await productService.getAll();
};
getAllProducts.validationScheme = null;

const getProductById = async (ctx) => {
  ctx.body = await productService.getById(ctx.params.productId);
};
getProductById.validationScheme = {
  params: {
    productId: Joi.number().integer().positive(),
  },
};

const getFilteredProducts = async (ctx) => {
  ctx.body = await productService.getFilteredProducts(
    ctx.params.price,
    ctx.params.inStock
  );
};
getFilteredProducts.validationScheme = {
  params: {
    price: Joi.number().integer().greater(0),
    inStock: Joi.boolean(),
  },
};

const getByQuery = async (ctx) => {
  const query = ctx.query;
  ctx.body = await productService.getByQuery(query);
};

module.exports = (app) => {
  const router = new Router({ prefix: "/product" });

  router.get("/", /*validate(getAllProducts.validationScheme),*/ getByQuery);
  router.get(
    "/:productId",
    validate(getProductById.validationScheme),
    getProductById
  );

  // //TO DO//
  // router.get(
  //   "/filtered/:price/:inStock",
  //   validate(getFilteredProducts.validationScheme),
  //   getFilteredProducts
  // );

  app.use(router.routes()).use(router.allowedMethods());
};
