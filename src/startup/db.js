const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });

  // mongodb://localhost:27017
  // cloud mongodb 

  mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/test" ,  {   useUnifiedTopology: true   } ).then((result) => {
    winston.info("Connection to MongoDB dddd .. " + result.Error);
  });
};