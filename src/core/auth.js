const jwksrsa = require("jwks-rsa");
const jwt = require("koa-jwt");
const { getLogger } = require("../core/logging");
const axios = require("axios");
const config = require("config");

const AUTH_USER_INFO = config.get("auth.userInfo");

function getJwtSecret() {
  try {
    let secretFunction = jwksrsa.koaJwtSecret({
      jwksUri: config.get("auth.jwksUri"),
      cache: true,
      cacheMaxEntries: 5,
    });
    return secretFunction;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function checkJwtToken() {
  try {
    let secretFunction = getJwtSecret();
    return jwt({
      secret: secretFunction,
      audience: config.get("auth.audience"),
      issuer: config.get("auth.issuer"),
      algorithms: ["RS256"],
      passthrough: true,
    });
    // .unless({
    //   path: [], // whitelist urls
    // }),
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

const permissions = Object.freeze({
  loggedIn: "loggedIn",
  purchase: "purchase",
});

function hasPermission(permission) {
  return async (ctx, next) => {
    const logger = getLogger();
    const user = ctx.state.user;
    logger.debug(`hasPermission: ${JSON.stringify(user)}`);

    // simply having a user object means they are logged in
    if (user && permission === permissions.loggedIn) {
      await next();
    } else if (
      user &&
      user.permissions &&
      user.permissions.includes(permission)
    ) {
      await next();
    } else {
      ctx.throw(
        403,
        "You are not allowed to view this part of the application",
        {
          code: "FORBIDDEN",
        }
      );
    }
  };
}

const logAuth = async (ctx, next) => {
  const logger = getLogger();
  logger.debug(`Token: ${ctx.headers.authorization}`);
  if (ctx.headers.authorization) {
    logger.debug(`Current user: ${JSON.stringify(ctx.state.user)}`);
    if (ctx.state.jwtOriginalError) {
      logger.error(`Error in token | ${ctx.state.jwtOriginalError}`);
    }
  }
  await next();
};

const addUserInfo = async (ctx) => {
  const logger = getLogger();
  try {
    const token = ctx.headers.authorization;
    const url = AUTH_USER_INFO;
    if (token && url && ctx.state.user) {
      logger.debug(`addUserInfo: ${url}, ${JSON.stringify(token)}`);

      const userInfo = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      ctx.state.user = {
        ...ctx.state.user,
        ...userInfo.data,
      };
    }
  } catch (error) {
    logger.error("Something went wrong when fetching user info", { error });
    throw error;
  }
};

module.exports = {
  checkJwtToken,
  hasPermission,
  logAuth,
  permissions,
  addUserInfo,
};
