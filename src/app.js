const express = require("express");
const cors = require("cors");
const { httpLogger } = require("./middlewares");
const routes = require("./routes");
const constants = require("./constants/constants");
const app = express();
const logger = require("../src/lib/logger");
const db = require("./models")

const port = process.env.PORT || "3000";

const response = require("./lib/response");

app.use(cors());
app.use(httpLogger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by"); //for security

app.use("/api", routes);

// db.sequelize.sync({alter:true})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var errors = {
    errors: {
      err: {
        msg:
          constants.STRING_CONSTANTS.ENDPOINT_NOT_FOUND
      },
    },
  };

  return response.sendResponse(
    constants.response_code.NOT_FOUND,
    null,
    null,
    res,
    errors
  );
});

app.listen(port,() => {
	console.log(`Server running on Port ${port}`);
})

module.exports = app;
