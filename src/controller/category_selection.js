const _ = require("lodash");
const { CategorySelection } = require("../models/category_selection");
const { validateAddCategorySelection } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getCategorySelection = async (req, res, next) => {
  let categorySelection = await CategorySelection.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(categorySelection);
};

exports.getCategorySelectionByProductSelectionId = async (req, res, next) => {
  let categorySelection = await CategorySelection.find({ productSelection: req.params.Id });
  // let categorySelection = await CategorySelection.find({ event : req.params.Id }) .populate("event");

  res.status(200).json(categorySelection);
};

exports.addCategorySelection = async (req, res, next) => {
  const { error } = validateAddCategorySelection(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/product/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  const categorySelection = new CategorySelection({
    productSelection: req.body.productSelection,
    name: req.body.name,
    nameEn: req.body.nameEn,
    cost: req.body.cost,
    img: req.file.originalname,
  });

  const result = await categorySelection.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteCategorySelection = async (req, res, next) => {
  const categorySelectionResult = await CategorySelection.findOne({ _id: req.params.Id });

  const DIR = "public/images/product/" + categorySelectionResult.img;

  if (!DIR) {
    await CategorySelection.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await CategorySelection.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await CategorySelection.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};

exports.updateCategorySelection = async (req, res, next) => {
  const newCategorySelection = {
    name: req.body.name,
    nameEn: req.body.nameEn,
  };

  CategorySelection.updateOne({ _id: req.body.categorySelectionId }, { $set: newCategorySelection })
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
//  exports.searchCategorySelection = async (req, res, next) => {
//   let categorySelection = await CategorySelection.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(categorySelection);
// };
