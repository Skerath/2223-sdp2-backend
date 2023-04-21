const Router = require("@koa/router");
const orderLineService = require("../service/orderLine");
const Joi = require("joi");
const validate = require("./_validation.js");

const postOrderLine = async (ctx) => {
  ctx.body = await orderLineService.create(ctx.request.body);
};
postOrderLine.validationScheme = {
  body: {
    productCount: Joi.number(),
    orderId: Joi.number(),
    productId: Joi.number(),
    originalAcquisitionPrice: Joi.number(),
  },
};

module.exports = (app) => {
  const router = new Router({ prefix: "/orderLine" });

  router.post("/", validate(postOrderLine.validationScheme), postOrderLine);

  app.use(router.routes()).use(router.allowedMethods());
};