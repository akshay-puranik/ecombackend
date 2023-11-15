const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const queries = require("../lib/queries/users");

exports.signup = async (req, res) => {
  const errors = await validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }
    const body = req.body;

    console.log(body);

    let username = body.username;
    let password = body.password;
    let emailId = body.emailId;

    let obj = {};
    obj.username = username;
    obj.password = password;
    obj.emailId = emailId;
  } catch (err) {}
};
