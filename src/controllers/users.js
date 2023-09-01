const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const queries = require("../lib/queries/users");

exports.signup = async (req,res) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return response.sendResponse(
          constant.response_code.BAD_REQUEST,
          null,
          null,
          res,
          errors
        );
      }
    try {
        const body = req.body;

        let username = body.username;
        let password = body.password;
        let emailId = body.emailId;

        let obj = {};
        obj.username = username;
        obj.password = password;
        obj.emailId = emailId;

        // let newUser = await queries.
    } catch (err) {
        
    }
}