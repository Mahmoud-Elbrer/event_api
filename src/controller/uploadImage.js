var express = require("express");
var multer = require("multer");
var fs = require("fs");
const { Event } = require("../models/event");
const { validateAddEvent } = require("../validations/validations");

exports.uploadImage = async (req, res, next) => {
  const { error } = validateAddEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  console.log("i am  here");
  //console.log("Received file" + req.file.originalname);
  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream("public/images/event/" + req.file.originalname);
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  // console.log("name file :");
  // console.log(req.file.filename);
  // console.log(req.file.originalname); // save this to db

  const event = new Event({
    name: req.body.name,
    nameEn: req.body.nameEn,
    img: req.file.originalname,
  });

  const result = await event.save();

  res.status(200).json({
    success: true,
  });
};
