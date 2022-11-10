const _ = require("lodash");
const { Product } = require("../models/product");
const { validateAddProduct } = require("../validations/validations");
var fs = require("fs");

exports.getProduct = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const category = req.params.category;
  let product = await Product.find()
    .populate("company", "-password")
    .populate("emirate", "-_id")
    .populate("event")
    .populate("service")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json(product);
};

exports.getProductByEmirateId = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const emirateId = req.params.emirateId;
  let product = await Product.find({ emirate: emirateId })
    .populate("company", "-password")
    .populate("emirate", "-_id")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json(product);
};


exports.getProductByServiceId = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const serviceId = req.params.serviceId;
  let product = await Product.find({ service: serviceId })
    .populate("company", "-password")
    .populate("emirate", "-_id")
    .limit(limit * 1)
    .skip((page - 1) * limit);

  res.status(200).json(product);
};

exports.getProductByTourismProgram = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const tourismProgram = req.params.tourismProgram;
  let product = await Product.find({ tourismProgram: tourismProgram })
    .populate("company", "-password")
    .populate("emirate", "-_id")
    .limit(limit * 1)
    .skip((page - 1) * limit);
  z;
  res.status(200).json(product);
};

exports.getProductById = async (req, res, next) => {
  let product = await Product.find({ _id: req.params.productId });

  res.status(200).json(product);
};

exports.addProduct = async (req, res, next) => {
  console.log("req.body");
  console.log(req.body);

  const { error } = validateAddProduct(req.body);
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

  // let product = Product(
  //   _.pick(req.body, [
  //     "emirate",
  //     "company",
  //     "event",
  //     "service",
  //     "productType",
  //     "productTitle",
  //     "productTitleEn",
  //     "productDescription", //
  //     "productDescriptionEn",
  //     "cost",
  //     "images",
  //     "available",
  //     "additionalNotes",
  //     "additionalNotesEn",
  //     "assets",
  //     "location",
  //     "locationEn",
  //     "longitude",
  //     "Latitude",
  //   ])
  // );

  const product = new Product({
    emirate: req.body.emirate,
    company: req.body.company,
    event: req.body.event,
    service: req.body.service,
    productType: req.body.productType,
    productTitle: req.body.productTitle,
    productTitleEn: req.body.productTitleEn,
    productDescription: req.body.productDescription,
    productDescriptionEn: req.body.productDescriptionEn,
    cost: req.body.cost,
    available: req.body.available,
    additionalNotes: req.body.additionalNotes,
    additionalNotesEn: req.body.additionalNotesEn,
    assets: req.body.assets,
    location: req.body.location,
    locationEn: req.body.locationEn,
    longitude: req.body.longitude,
    Latitude: req.body.Latitude,
    images: req.file.originalname,
  });

  await product.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteProduct = async (req, res, next) => {
  await Product.deleteOne({ _id: req.params.productId });

  res.status(200).json({
    success: true,
  });
};

exports.setVisitedProduct = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.productId });
  if (!product) return res.status(400).send("product not found");

  var newNumberVisitors = product.numberVisitors + 1;

  await Product.updateOne(
    { _id: req.params.productId },
    {
      $set: {
        numberVisitors: newNumberVisitors,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};

exports.searchProduct = async (req, res, next) => {
  console.log("searchName::");
  console.log(req.params.searchName);

  let product = await Product.find({
    $or: [
      { productTitle: { $regex: req.params.searchName } },
      { productTitleEn: { $regex: req.params.searchName } },
      { productDescription: { $regex: req.params.searchName } },
      { productDescriptionEn: { $regex: req.params.searchName } },
    ],
  });
  res.status(200).json(product);
};

exports.filterSearchProduct = async (req, res, next) => {
  const filters = req.query;
  const filteredUsers = Product.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });

  res.status(200).json(product);
};
