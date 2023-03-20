const _ = require("lodash");
const { Product } = require("../models/product");
const { ProductDates } = require("../models/product_dates");
const { validateAddProduct } = require("../validations/validations");
var fs = require("fs");

exports.getProduct = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const category = req.params.category;
  let product = await Product.find()
    .populate("company", "-password")
    //.populate("emirate", "-_id")
    // .populate("event")
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
    .populate("emirate", "-_id");
  // .limit(limit * 1)
  // .skip((page - 1) * limit);

  res.status(200).json(product);
};

exports.getProductByServiceIdAndProductType = async (req, res, next) => {
  const page = req.params.page;
  const limit = req.params.limit;
  const serviceId = req.params.serviceId;
  const productType = req.params.productType;

  console.log(productType);

  //db.inventory.find( { $and: [ { service: serviceId, { productType: productType } ] } )

  let product = await Product.find({
    $and: [{ service: serviceId, productType: productType }],
  })
    .populate("company", "-password")
    .populate("event")
    .populate("service")
    .populate("emirate", "-_id");

  res.status(200).json(product);
};

exports.getProductByCompanyAndByServiceId = async (req, res, next) => {
  console.log("hereeee");

  const page = req.params.page;
  const limit = req.params.limit;
  // const companyId = req.params.companyId;
  const serviceId = req.params.serviceId;

  //db.inventory.find( { $and: [ { service: serviceId, { productType: productType } ] } )

  let product = await Product.find({
    $and: [{ service: serviceId, company: req.user._id }],
  })
    // .populate("company", "-password")
    // .populate("event")
    .populate("service");
  //.populate("emirate", "-_id")
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
  let product = await Product.find({ _id: req.params.productId }).populate("service");

  res.status(200).json(product);
};

exports.addProduct = async (req, res, next) => {



console.log(req.body.services);
// console.log(JSON.parse(req.body.services));
// var myArray = [];
// for(var i in req.body.services) {
//     myArray.push(req.body.services[i]);
// }
// //req.body.services = JSON.parse(req.body.services); 
// console.log("after");
// console.log(myArray);
console.log(req.body);


  let resultServices =  req.body.services.replace("(", "").replace("[", "").replace(")", "").replace("]", "");
  let resultServicesEn =  req.body.servicesEn.replace("(", "").replace("[", "").replace(")", "").replace("]", "");

  // let resultServices = req.body.services.replace("(", "").replace(")", "");
  // let resultServicesEn = req.body.servicesEn.replace("(", "").replace(")", "");

 req.body.services = resultServices .split(",");
  req.body.servicesEn = resultServicesEn.split(",");

  console.log('after');
  console.log(req.body.services);

  // // const { error } = validateAddProduct(req.body);
  // // if (error) return res.status(400).send(error.details[0].message);

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

  console.log("last");
  console.log(req.body.services);

  const product = new Product({
    company: req.user._id,
    service: req.body.service,
    productTitle: req.body.productTitle,
    productTitleEn: req.body.productTitleEn,
    productDescription: req.body.productDescription,
    productDescriptionEn: req.body.productDescriptionEn,
    services: req.body.services,
    servicesEn: req.body.servicesEn,
    cost: req.body.cost,
    available: req.body.available,
    additionalNotes: req.body.additionalNotes,
    additionalNotesEn: req.body.additionalNotesEn,
    assets: req.body.assets,
    numberGuests: req.body.numberGuests,
    location: req.body.location,
    locationEn: req.body.locationEn,
    longitude: req.body.longitude,
    Latitude: req.body.Latitude,
    images: req.file.originalname,
  });

  const result = await product.save();

  console.log(result);

  res.status(200).json({
    success: true,
   product: result,
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

exports.addProductWithDates = async (req, res, next) => {
  console.log("productDates:::::");
  console.log("req.body");
  console.log(req.body);

  // const { error } = validateAddProduct(req.body);
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

  const product = new ProductDates({
    emirate: req.body.emirate,
    company: req.body.company,
    event: req.body.event,
    service: req.body.service,
    dates: req.body.dates,
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
    images: "req.file.originalname",
  });

  await product.save();

  res.status(200).json({
    success: true,
  });
};

exports.updateProduct = async (req, res, next) => {
  //console.log(req.body);
  console.log("hi boy");

  const newProduct = {
    company: req.body.company,
    service: req.body.service,
    productTitle: req.body.productTitle,
    productTitleEn: req.body.productTitleEn,
    productDescription: req.body.productDescription,
    productDescriptionEn: req.body.productDescriptionEn,
    // services: req.body.services,
    // servicesEn: req.body.servicesEn,
    cost: req.body.cost,
    available: req.body.available,
    additionalNotes: req.body.additionalNotes,
    additionalNotesEn: req.body.additionalNotesEn,
    assets: req.body.assets,
    numberGuests: req.body.numberGuests,
    location: req.body.location,
    locationEn: req.body.locationEn,
    longitude: req.body.longitude,
    Latitude: req.body.Latitude,
  };

  Product.updateOne({ _id: req.body.productId }, { $set: newProduct })
    .then((result) => {
      if (result) {
        console.log(result);
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

exports.updateServicesProduct = async (req, res, next) => {
  //console.log(req.body);
  console.log("hi boy servcies");

  let resultServices = req.body.services.replace("(", "").replace(")", "");

  let resultServicesEn = req.body.servicesEn.replace("(", "").replace(")", "");

  req.body.services = resultServices.split(",");
  req.body.servicesEn = resultServicesEn.split(",");

  const newProduct = {
    services: req.body.services,
    servicesEn: req.body.servicesEn,
  };

  Product.updateOne({ _id: req.body.productId }, { $set: newProduct })
    .then((result) => {
      if (result) {
        console.log(result);
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

exports.deleteServicesProduct = async (req, res, next) => {
  console.log("ju");
  let product = await Product.find({ _id: req.params.productId });

  console.log(product);
  console.log(product[0]["services"]);
  console.log(product[0]["services"][0]);

  //let newProduct =  product[0]['services'].removeAStringDemo.updateOne( { $pull: { "Score":"John" }});

  product[0]["services"].splice(req.params.index, 1);
  console.log(product[0]["services"]);

  const newProduct = {
    services: product[0]["services"],
    servicesEn: product[0]["services"],
  };

  console.log(newProduct);

  Product.updateOne({ _id: req.params.productId }, { $set: newProduct })
    .then((result) => {
      if (result) {
        console.log(result);
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

  // await Product.deleteOne({ _id: req.params.productId });

};


exports.updateImgProduct  = async (req, res, next) => {
  console.log(" i am updateImageProduct");

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
    images: req.file.originalname,
  };

  console.log(newProduct);

  Product.updateOne({ _id: req.params.productId }, { $set: newProduct })
    .then((result) => {
      if (result) {
        console.log("result");
        console.log(req.params.productId);
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
