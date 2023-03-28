const winston = require('winston');
require("winston-mongodb");

module.exports = function () {

  const files = new winston.transports.File({ filename: 'logfile.log' });
  const myconsole = new winston.transports.Console();

  winston.add(myconsole);
  winston.add(files);

}








// const winston = require('winston');
// require("winston-mongodb");
// require("express-async-errors");

// module.exports = function(){
//     // for solve Uncaught Exceptions : Exceptions before start
// process.on("uncaughtException", (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
//   });

//   // this for log handlerException on File
//   // winston.handlerException(
//   //   new winston.transports.Console({ colorize : true  , prettyPrint : true}) , 
//   //   new winston.transports.File({ filename: "unhandledException.log" }));
  
//   // for solve unhandled Rejection
//   process.on("unhandledRejection", (ex) => {
//     // throw ex ;
//     winston.error(ex.message, ex);
//     process.exit(1);
//   });
  
//   // this for log error on File
//   winston.add(new winston.transports.File({ filename: "logfile.log" }));
//   // this for log error on MongoDB
//   winston.add(
//     new winston.transports.MongoDB({
//       db: "mongodb://localhost/udemy_db",
//       level: "info",
//     })
//   );
// }