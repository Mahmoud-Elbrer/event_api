const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {


  // server db
  mongoose.connect("mongodb://127.0.0.1:27017/testEventDB" ,  { useNewUrlParser: true } ).then((result) => {
    winston.info("Connection to MongoDB .. " + result.Error);
    console.log(result.Error);
    console.log("mongodb://localhost:27017");
  });


  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });
  

  // mongodb://localhost:27017
  // cloud mongodb 

  // mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/test" ,  {   useUnifiedTopology: true   } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });
};