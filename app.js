const app = express();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

// var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use('/images', express.static('images'));
app.use("/event", express.static("public/images/event"));

//require("./src/startup/logging")();
console.log("Here 1");
require("./src/startup/routes")(app);
console.log("Here 2");
require("./src/startup/config")();
console.log("Here 3");
require("./src/startup/db")();
console.log("Here 4");
require("./src/startup/paypal_config")();
console.log("Here 5");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

module.exports = app;
