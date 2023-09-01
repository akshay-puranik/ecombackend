const response = require("../lib/response");
const constant = require("../constants/constants");
require("dotenv").config();
const jwtsecret = process.env.JWT_SECRET;

let errors = { errors: {} };

const authorization = async (req, res, next) => {
  req.token = req.headers.authorization;
  req.token = JSON.stringify({ id: 1001, role: "ADMIN" });

  if (!req.token) {
    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  }

  next();
};

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtsecret, (err, decoded) => {
      if (err) {
        response.sendResponse(
          constant.response_code.UNAUTHORIZED,
          "Failed",
          null,
          res,
          errors
        );
      } else {
        req.user = decoded;
        req.headers.authorization = JSON.stringify(decoded);
        // TODO: Need to change this to req.user from req.user
        return next();
      }
    });
  } else {
    var errors = {
      errors: { err: { msg: constant.STRING_CONSTANTS.TOKEN_MISSING } },
    };
    response.sendResponse(
      constant.response_code.FORBIDDEN,
      "Failed",
      null,
      res,
      errors
    );
  }
};

module.exports = authorization;
