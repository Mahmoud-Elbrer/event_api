const _ = require("lodash");
const { Service } = require("../models/service");
const { validateAddService } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getService = async (req, res, next) => {
  let service = await Service.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(service);
};

exports.addService = async (req, res, next) => {
  //const { error } = validateAddService(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  // const service = Service(
  //   _.pick(req.body, ["name", "nameEn", "image", "icon"])
  // );

  // // console.log("Received file" + req.file.originalname);
  // var src = fs.createReadStream(req.file.path);
  // var dest = fs.createWriteStream(
  //   "public/images/service" + uuid.v4() + req.file.originalname
  // );
  // src.pipe(dest);
  // src.on("end", function () {
  //   fs.unlinkSync(req.file.path);
  //   // console.log("ERROR HRERES");
  //   //res.json('OK: received ' + req.file.originalname);
  // });
  // src.on("error", function (err) {
  //   // console.log("ERROR HRERES3" + err);
  //   //  res.json('Something went wrong!');
  // });

  const service = new Service({
    name: req.body.name,
    nameEn: req.body.nameEn,
    event: req.body.event,
    img: "req.file.filename",
  });

  const result = await service.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteService = async (req, res, next) => {
  const result = await Service.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchService = async (req, res, next) => {
//   let service = await Service.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(service);
// };
