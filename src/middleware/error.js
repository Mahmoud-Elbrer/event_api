const winston =  require('winston');

module.exports = function (err, req, res, next) {
  // winston.log('error' , err.message);  //  or use this 
  // level of winston to write log (  winston. ) :1- error  ,2- warn ,3- info ,4-  verbose ,5- debug  ,6- silly (يترتيب الي اين تةد عرض اخطا )
  winston.error(err.message , err  );
  res.status(500).send("something wrong " + err.message);
};



// code for throw error 
//  throw  new Error("could not get data from server");
