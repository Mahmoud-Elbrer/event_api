const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });

  mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/test" ,  {  useNewUrlParser: true, useUnifiedTopology: true   } ).then((result) => {
    winston.info("Connection to MongoDB .. " + result.Error);
  });
};
