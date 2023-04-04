const _ = require("lodash");
const { ProductSelection } = require("../models/product_selection");
const { validateAddProductSelection } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");



exports.addProductSelection = async (req, res, next) => {

  console.log(req.body);
  console.log(req.files[0].filename);
  console.log(req.files[1].filename);


  let resultCategories = req.body.categories.replace("(", "").replace(")", "");
  let resultCategoriesEn = req.body.categoriesEn.replace("(", "").replace(")", "");
  let resultCategoriesCost = req.body.categoriesCost.replace("(", "").replace(")", "");


  req.body.categories = resultCategories.split(",");
  req.body.categoriesEn = resultCategoriesEn.split(",");
  req.body.categoriesCost = resultCategoriesCost.split(",");

  // const { error } = validateAddProductSelection(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // var src = fs.createReadStream(req.file.path);
  // var dest = fs.createWriteStream(
  //   "public/images/product/" + req.file.originalname
  // );
  // src.pipe(dest);
  // src.on("end", function () {
  //   fs.unlinkSync(req.file.path);
  //   //res.json("OK: received " + req.file.originalname);
  // });
  // src.on("error", function (err) {
  //   res.json("Something went wrong!");
  // });

  const productSelection = new ProductSelection({
    product: req.body.product,
    typeSelectionProduct: req.body.typeSelectionProduct,
    selectionTitle: req.body.selectionTitle,
    selectionTitleEn: req.body.selectionTitleEn,
    selectionDescription: req.body.selectionDescription,
    selectionDescriptionEn: req.body.selectionDescriptionEn,

    // services: req.body.selectionDescriptionEn,
    // servicesEn: req.body.selectionDescriptionEn,
    categories: req.body.selectionDescriptionEn,
    categoriesEn: req.body.selectionDescriptionEn,
    categoriesCost: req.body.selectionDescriptionEn,

    cost: req.body.cost,
    img: req.files[1] && req.files[1].filename ? req.files[1].filename : '',
    img1: req.files[1] && req.files[1].filename ? req.files[1].filename : '',
    img2: req.files[2] && req.files[2].filename ? req.files[2].filename : '',
    img3: req.files[3] && req.files[3].filename ? req.files[3].filename : '',
    img4: req.files[4] && req.files[4].filename ? req.files[4].filename : '',
    img5: req.files[5] && req.files[5].filename ? req.files[5].filename : '',
  });

  await productSelection.save();

  res.status(200).json({
    success: true,
  });
};

































exports.getProductSelection = async (req, res, next) => {
  let productSelection = await ProductSelection.find().populate("product");;
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(productSelection);
};

exports.getProductSelectionByTypeSelection = async (req, res, next) => {
  const product = req.params.productId;
  const typeSelectionId = req.params.typeSelectionId;
  let productSelection = await ProductSelection.find({ product: product ,typeSelectionProduct : typeSelectionId }).populate("product");

  res.status(200).json(productSelection);
};

exports.getProductSelectionByProductId = async (req, res, next) => {
  const product = req.params.Id;
  console.log(product);
  let productSelection = await ProductSelection.find({ product: product }).populate("product");

  res.status(200).json(productSelection);
};



// for admin
exports.getProductSelectionByCompany = async (req, res, next) => {
  const company = req.params.Id;
  let productSelection = await ProductSelection.find({ company: company });

  res.status(200).json(productSelection);
};

exports.addProductSelection1 = async (req, res, next) => {

  console.log(req.body);


  let resultCategories = req.body.categories.replace("(", "").replace(")", "");
  let resultCategoriesEn = req.body.categoriesEn.replace("(", "").replace(")", "");
  let resultCategoriesCost = req.body.categoriesCost.replace("(", "").replace(")", "");

  req.body.categories = resultCategories.split(",");
  req.body.categoriesEn = resultCategoriesEn.split(",");
  req.body.categoriesCost = resultCategoriesCost.split(",");

  // const { error } = validateAddProductSelection(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/product/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  const productSelection = new ProductSelection({
    product: req.body.product,
    typeSelectionProduct: req.body.typeSelectionProduct,
    selectionTitle: req.body.selectionTitle,
    selectionTitleEn: req.body.selectionTitleEn,
    selectionDescription: req.body.selectionDescription,
    selectionDescriptionEn: req.body.selectionDescriptionEn,

    // services: req.body.selectionDescriptionEn,
    // servicesEn: req.body.selectionDescriptionEn,
    categories: req.body.selectionDescriptionEn,
    categoriesEn: req.body.selectionDescriptionEn,
    categoriesCost: req.body.selectionDescriptionEn,

    cost: req.body.cost,
    img: req.file.originalname,
  });

  await productSelection.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteProductSelection = async (req, res, next) => {
  const result = await ProductSelection.findOne({ _id: req.params.Id });

  const DIR = "public/images/selection/" + result.img;

  if (!DIR) {
    await ProductSelection.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await ProductSelection.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await ProductSelection.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchProductSelection = async (req, res, next) => {
//   let productSelection = await ProductSelection.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(productSelection);
// };


exports.updateProductSelection = async (req, res, next) => {
  const newProductSelection = {
    //typeSelectionProduct: req.body.typeSelectionProduct,
    selectionTitle: req.body.selectionTitle,
    selectionTitleEn: req.body.selectionTitleEn,
    selectionDescription: req.body.selectionDescription,
    selectionDescriptionEn: req.body.selectionDescriptionEn,
    cost: req.body.cost,
  };

  ProductSelection.updateOne({ _id: req.body.productSelectionId }, { $set: newProductSelection })
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


exports.updateImgProductSelection  = async (req, res, next) => {
  console.log(" i am updateImgProductSelection");

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/product/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  const newProduct = {
    img: req.file.originalname,
  };

  console.log(newProduct);

  ProductSelection.updateOne({ _id: req.params.productSelectionId }, { $set: newProduct })
    .then((result) => {
      if (result) {
        console.log("result");
        console.log(req.params.productSelectionId);
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


