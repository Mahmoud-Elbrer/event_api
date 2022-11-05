const _ = require("lodash");
const { Event } = require("../models/event");
const { validateAddEvent } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getEvent = async (req, res, next) => {
  let event = await Event.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(event);
};

exports.addEvent = async (req, res, next) => {
  const { error } = validateAddEvent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/event/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

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

exports.deleteEvent = async (req, res, next) => {
  const eventResult = await Event.findOne({ _id: req.params.Id });

  const DIR = "public/images/event/" + eventResult.img;

  if (!DIR) {
    await Event.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await Event.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await Event.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchEvent = async (req, res, next) => {
//   let event = await Event.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(event);
// };
