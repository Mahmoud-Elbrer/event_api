const _ = require("lodash");
const { ProductSelection } = require("../models/product_selection");
const { validateAddProductSelection } = require("../validations/validations");
var fs = require("fs");
//import { v4 as uuidv4 } from 'uuid';
const uuid = require("uuid");

exports.getProductSelection = async (req, res, next) => {
  let productSelection = await ProductSelection.find().populate("product");;
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(productSelection);
};

exports.getProductSelectionByProductId = async (req, res, next) => {
  const product = req.params.Id;
  console.log(product);
  let productSelection = await ProductSelection.find({ product: product }).populate("product");

  res.status(200).json(productSelection);
};

exports.getProductSelectionByCompany = async (req, res, next) => {
  const company = req.params.Id;
  let productSelection = await ProductSelection.find({ company: company });

  res.status(200).json(productSelection);
};

exports.addProductSelection = async (req, res, next) => {

  console.log(req.body);

  const { error } = validateAddProductSelection(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
