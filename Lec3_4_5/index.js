const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

const logger = (req, res, next) => {
  console.log("I AM LOGGER");
  next();
};

const logger2 = (req, res, next) => {
  console.log("I AM LOGGER 2");
  next();
};

const commonMiddleWare = (req, res, next) => {
  console.log("Call Error MiddleWare");
  next(new Error("error occurred"));
};

const errorMiddleWare = (err, req, res, next) => {
  console.log(err.message);
  next();
};

// app.use(logger);
// app.use(logger2);
app.use(commonMiddleWare);
app.use(errorMiddleWare);
app.use(morgan("dev"));

app.listen(3000, () => {
  console.log(`Server Live At Port ${port}`);
});
