const { check, param } = require("express-validator");
const enums = require("../../constants/enums");
const Errors = {
  PUT_OPD_FOR_CRM_ID: [
    check("opdId", "Opd id should be Integer").notEmpty().isInt(),
    check("crmId", "crmId should be Integer").notEmpty().optional().isInt(),
    check("ownerId", "ownerId should be Integer").notEmpty().isInt(),
  ],
  ADD_NEW_USER_FROM_CRM: [
    check("name", "Please select name").notEmpty().isString(),
    check("email", "Email should be valid and not empty")
      .optional()
      .isEmail()
      .notEmpty(),
    check(
      "mobileNo",
      "Mobile number should be Numeric and length must be 10 digit"
    )
      .isNumeric()
      .isInt({ gt: 999999999 })
      .notEmpty()
      .isLength({ min: 10, max: 10 }),
    check(
      "ownerId",
      "Error: Make sure owner is added. If you still face issue - contact Admin."
    )
      .isString()
      .notEmpty(),
  ],
  GET_SINGLE_USER: [
    check(
      "mobileNo",
      "Mobile number should be Numeric and length must be 10 digit"
    )
      .isNumeric()
      .isInt({ gt: 999999999 })
      .notEmpty()
      .isLength({ min: 10, max: 10 }),
  ],
};
module.exports = Errors;
