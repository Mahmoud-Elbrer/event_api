const _ = require("lodash");
const { TypeSelectionProduct } = require("../models/type_selection_product");
const { validateAddTypeSelectionProduct } = require("../validations/validations");

exports.getTypeSelectionProduct = async (req, res, next) => {
  let typeSelectionProduct = await TypeSelectionProduct.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(typeSelectionProduct);
};



exports.getTypeSelectionProductByService = async (req, res, next) => {

  const service = req.params.service;
  let typeSelectionProduct = await TypeSelectionProduct.find({ service: service });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(typeSelectionProduct);
};

exports.addTypeSelectionProduct = async (req, res, next) => {
  const { error } = validateAddTypeSelectionProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const typeSelectionProduct = TypeSelectionProduct(_.pick(req.body, [ "service" ,"name" ,"nameEn"]));

  const result = await typeSelectionProduct.save();

  res.status(200).json({
    success: true,
  });
};


exports.deleteTypeSelectionProduct = async (req, res, next) => {
  const result = await TypeSelectionProduct.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};



exports.updateTypeSelectionProduct = async (req, res, next) => {
  const newTypeSelection = {
    service: req.body.service,
    name: req.body.name,
    nameEn: req.body.nameEn,
  };

  TypeSelectionProduct.updateOne({ _id: req.body.typeSelectionId }, { $set: newTypeSelection })
    .then((result) => {
      //console.log(result);
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