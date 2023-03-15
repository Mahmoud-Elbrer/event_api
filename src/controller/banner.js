const _ = require("lodash");
const { Banner } = require("../models/banner");
const { validateAddBanner } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getBanner = async (req, res, next) => {
  let banner = await Banner.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(banner);
};

exports.addBanner = async (req, res, next) => {
  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/banner/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  const banner = new Banner({
    img: req.file.originalname,
  });

  const result = await banner.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteBanner = async (req, res, next) => {
  const bannerResult = await Banner.findOne({ _id: req.params.Id });

  const DIR = "public/images/banner/" + bannerResult.img;

  if (!DIR) {
    await Banner.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await Banner.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await Banner.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};



exports.updateImgBanner  = async (req, res, next) => {
  console.log(" i am updateImgBanner");

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/banner/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  const newBanner = {
    img: req.file.originalname,
  };


  Banner.updateOne({ _id: req.params.bannerId }, { $set: newBanner })
    .then((result) => {
      if (result) {
        console.log("result");
        console.log(req.params.bannerId);
        console.log(result);
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
        });

        // todo : remove old image
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error Connection  " + err,
        success: false,
      });
    });
};