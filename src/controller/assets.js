const _ = require("lodash");
const { Assets } = require("../models/assets");
const { validateAddAssets } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getAssets = async (req, res, next) => {
  let assets = await Assets.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(assets);
};

exports.addAssets = async (req, res, next) => {
  //const { error } = validateAddAssets(req.body);
  //if (error) return res.status(400).send(error.details[0].message);

  // const assets = Assets(
  //   _.pick(req.body, ["name", "nameEn", "image", "icon"])
  // );

  // console.log("Received file" + req.file.originalname);
  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/assets" + uuid.v4() + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    // console.log("ERROR HRERES");
    //res.json('OK: received ' + req.file.originalname);
  });
  src.on("error", function (err) {
    // console.log("ERROR HRERES3" + err);
    //  res.json('Something went wrong!');
  });

  const assets = new Assets({
    name: req.body.name,
    nameEn: req.body.nameEn,
    img: req.file.originalname,
  });

  const result = await assets.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteAssets = async (req, res, next) => {
  const result = await Assets.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchAssets = async (req, res, next) => {
//   let assets = await Assets.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(assets);
// };
