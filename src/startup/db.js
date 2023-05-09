const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // server connect
  mongoose.connect("mongodb://127.0.0.1:27017/testServerDB" ,  { useNewUrlParser: true } ).then((result) => {
    winston.info("Connection to MongoDB .. " + result.Error);
  });


  // localhost
  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });
  

  // mongodb://localhost:27017
  // cloud mongodb 

  // cloud mongodb 
  // mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/test" ,  {   useUnifiedTopology: true   } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });
};


// mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2