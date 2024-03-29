var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use('/images', express.static('images'));
app.use("/event", express.static("public/images/event"));
app.use("/banner", express.static("public/images/banner"));

require("./src/startup/logging")();
require("./src/startup/routes")(app);
require("./src/startup/config")();
require("./src/startup/db")();
require("./src/startup/paypal_config")();
//require("./src/startup/socket");

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
//app.use(bodyParser.urlencoded({ extended: false }));

// payload too large when upload image
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:50000 }));
app.use(bodyParser.raw({ limit: '10mb'}) );

// parse application/json
app.use(bodyParser.json());

module.exports = app;
