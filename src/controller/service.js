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

exports.getServiceByEventId = async (req, res, next) => {
  let service = await Service.find({ event: req.params.Id });
  // let service = await Service.find({ event : req.params.Id }) .populate("event");

  res.status(200).json(service);
};

exports.addService = async (req, res, next) => {
//  const { error } = validateAddService(req.body);
//  if (error) return res.status(400).send(error.details[0].message);

//   var src = fs.createReadStream(req.file.path);
//   var dest = fs.createWriteStream(
//     "public/images/service/" + req.file.originalname
//   );
//   src.pipe(dest);
//   src.on("end", function () {
//     fs.unlinkSync(req.file.path);
//     //res.json("OK: received " + req.file.originalname);
//   });
//   src.on("error", function (err) {
//     res.json("Something went wrong!");
//   });

  const service = new Service({
    name: req.body.name,
    nameEn: req.body.nameEn,
    productType: req.body.productType,
    isPercent: req.body.isPercent,
    img: "req.file.originalname",
  });

  const result = await service.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteService = async (req, res, next) => {
  const serviceResult = await Service.findOne({ _id: req.params.Id });

  const DIR = "public/images/service/" + serviceResult.img;

  if (!DIR) {
    await Service.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await Service.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await Service.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};

exports.updateService = async (req, res, next) => {
  const newService = {
    name: req.body.name,
    nameEn: req.body.nameEn,
  };

  Service.updateOne({ _id: req.body.serviceId }, { $set: newService })
    .then((result) => {
      console.log("Re result");
      console.log(result);
      if (result) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
        });
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log("err");
      console.log(err);
      res.status(404).json({
        message: "Error Connection  " + err,
        success: false,
      });
    });
};

// search method
//  exports.searchService = async (req, res, next) => {
//   let service = await Service.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(service);
// };
