const _ = require("lodash");
const { Emirate } = require("../models/emirate");
const { validateAddEmirate } = require("../validations/validations");

exports.getEmirate = async (req, res, next) => {
  let emirate = await Emirate.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(emirate);
};

exports.addEmirate = async (req, res, next) => {
  const { error } = validateAddEmirate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emirate = Emirate(_.pick(req.body, [ "name" ,"nameEn"]));

  const result = await emirate.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteEmirate = async (req, res, next) => {
  const result = await Emirate.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};


exports.updateEmirate = async (req, res, next) => {
  const newEmirate = {
    name: req.body.name,
    nameEn: req.body.nameEn,
  };

  Emirate.updateOne({ _id: req.body.emirateId }, { $set: newEmirate })
    .then((result) => {
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
      res.status(404).json({
        message: "Error Connection  " + err,
        success: false,
      });
    });
};