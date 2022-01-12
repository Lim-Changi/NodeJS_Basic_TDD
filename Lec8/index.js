const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const user = require("./api/user");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware 형태로 공통 url 을 설정할 수 있다.
app.use("/users", user);

module.exports = app;
