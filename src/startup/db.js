const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  // server db
  mongoose.connect("mongodb://event:event@213.190.4.53:27017/event",{ useUnifiedTopology: true }).then((result) => {
      winston.info("Connection to MongoDB .. " + result.Error);
    });

    // localhost
  // mongoose.connect("mongodb://localhost/eventDB" ,  { useNewUrlParser: true } ).then((result) => {
  //   winston.info("Connection to MongoDB .. " + result.Error);
  // });

  //cloud mongodb
  // mongoose.connect("mongodb+srv://mahmoud:6MDW5FMNfmUa4xSj@cluster0.5tjuslb.mongodb.net/test",{ useUnifiedTopology: true }).then((result) => {
  //     winston.info("Connection to MongoDB .. " + result.Error);
  //   });

};

// var MongoClient = require("mongodb").MongoClient,
//   format = require("util").format;

// MongoClient.connect("mongodb://127.0.0.1:27017/test", function (err, db) {
//   if (err) throw err;

//   var collection = db.collection("test_insert");
//   collection.insert({ a: 2 }, function (err, docs) {
//     collection.count(function (err, count) {
//       console.log(format("count = %s", count));
//       db.close();
//     });
//   });
// });
