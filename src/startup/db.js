const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });
  
  mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/?retryWrites=true&w=majority" ,  {   useUnifiedTopology: true   } ).then((result) => {
    console.log(result.CastError);
    winston.info("Connection to MongoDB dddd .. " + result.Error);
  });
};