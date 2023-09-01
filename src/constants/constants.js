module.exports = Object.freeze({
  SERVICE_NAME: "backend",
  INDEX_NOT_FOUND: -1,
  NO_ITEM_COUNT: 0,
  INDEX_ZERO: 0,
  INDEX_ONE: 1,
  SALT_ROUNDS: 10,

  Delimeters: {
    EMPTY: "",
    STRING_JOIN_SYMBOL_TILT: "~~",
    EXTRA_SPACE: " ",
    AMPERSAND: "&",
    PIPE: "|",
    ASTRIK: "*",
    FORWARD_SLASH: "/",
  },
  DB: {
    table: {
      PRODUCTSMASTER: "productsmaster",
      USERSMASTER: "usersmaster",
      ORDERSMASTER: "ordersmaster",
    },
  },
  response_code: {
    /** Success Codes */
    SUCCESS: 200,
    No_Content: 204,
    EMPTY_REQ: 227,

    /** Error Codes*/
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    JWT: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INVALID_ID: 406,
    DUPLICATE: 406,
    CONFLICT: 409,
    FILE_NOT_SUPPORTED: 415,
    UPGRADE_APP: 426,
    ROLE_BREACH: 451,
    RECORD_NOT_FOUND: 499,
    INTERNAL_SERVER_ERROR: 500,
  },
  otp: {
    EXPIRY: 15, //in minutes
    MAX_RESEND: 2,
    MAX_RETRY: 2,
  },
  MOBILE_NO_LENGTH: 10,
  PASSWORD_LENGTH: 8,
  OTP_LENGTH: 100000,
  DEV_OTP: 123456,
  jwt: {
    SECRET: "secretfortoken",
    USER_TOKEN_EXPIRE: 86400,
    ADMIN_TOKEN_EXPIRE: 86400,
    EXPIRE: 86400,
  },
  string_constants: {
    SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
    INVALID_AUTHORIZATION: "Unauthorized Request",
  },
  METHODS: {
    GET: "get",
    POST: "post",
  },
  STRING_CONSTANTS: {
    UNAUTHORIZED_ACCESS: "Unauthorized Access",
    SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
    MOBILE_NO_LENGTH_STRING: `Mobile number length should be greater than 10`,
    ENDPOINT_NOT_FOUND: "Endpoint not found",
    INVALID_AUTHORIZATION: "Unauthorized Request",
    CORRECT_DATE_FORMAT: "date should be in correct format i.e. MM-DD-YYYY",
    CORRECT_TIME_FORMAT:
      "startTime and endTime should be in correct format i.e. HH:mm (24 Hours)",
    BODY_EMPTY: `Data body is empty`,
  },
  jwt: {
    EXPIRE: 86400,
  },
  mediaUrl: {
    facebook: "www.facebook.com",
    instagram: "www.instagram.com",
  },
  INDIA_CODE: "91",
});
