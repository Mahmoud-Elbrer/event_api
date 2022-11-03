var express = require("express");
var multer = require("multer");
var fs = require("fs");

exports.uploadImage = async (req, res, next) => {
  console.log("i am  here");
  //console.log("Received file" + req.file.originalname);
  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream("uploads/" + req.file.originalname);
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  console.log("name file :");
  console.log(req.file.filename);
  console.log(req.file.originalname); // save this to db
};
