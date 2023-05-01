const Router = require("@koa/router");
const customerService = require("../service/customer");
const Joi = require("joi");
const validate = require("./_validation.js");
const { addUserInfo } = require("../core/auth");

const getCustomerByAuthId = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await customerService.getByAuthId(ctx.state.user.sub);
};
getCustomerByAuthId.validationScheme = null;

const getAllColleagues = async (ctx) => {
  await addUserInfo(ctx);
  ctx.body = await customerService.getAllColleagues(ctx.state.user.sub);
};
getAllColleagues.validationScheme = null;

module.exports = (app) => {
  const router = new Router({ prefix: "/customers" });

  router.get(
    "/me",
    validate(getCustomerByAuthId.validationScheme),
    getCustomerByAuthId
  );

  router.get(
    "/colleagues",
    validate(getAllColleagues.validationScheme),
    getAllColleagues
  );

  app.use(router.routes()).use(router.allowedMethods());
};
