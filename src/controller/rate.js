const _ = require("lodash");
const { Rate } = require("../models/rate");
const { validateAddRate } = require("../validations/validations");

exports.getRate = async (req, res, next) => {
  let rate = await Rate.find({ user: req.user._id }).populate("product", "").populate("productSelection", "");
  // let book = await Book.find({ user: req.user._id }).populate("doctor", "-password").populate("user", "-password").populate("timeTableId");  
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(rate);
};


exports.reviewProduct = async (req, res, next) => {
  let rate = await Rate.find({ product: req.params.productId });

  rate.forEach(element => {
    if(element.product ===  req.params.productId){
      element.rating = req.params.productId ; 
    }
  });

  let myRate = rate.reduce((acc,item) => item.rating + acc , 1) / rate.length ; 

  res.status(200).json({
    rate : myRate 
  });
};

exports.reviewSelectionProduct = async (req, res, next) => {
  let rate = await Rate.find({ productSelection: req.params.productSelectionId });

  rate.forEach(element => {
    if(element.productSelection ===  req.params.productSelectionId){
      element.rating = req.params.productSelectionId ; 
    }
  });

  let myRate = rate.reduce((acc,item) => item.rating + acc , 1) / rate.length ; 

  res.status(200).json({
    rate : myRate 
  });
};

exports.addRate = async (req, res, next) => {
  const { error } = validateAddRate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  req.body.user = req.user._id ; 

  const rate = Rate(_.pick(req.body, ["user", "product" , "productSelection","rating" , "comment"]));

  await rate.save();

  res.status(200).json({
    success: true,
  });
};

exports.deleteRate = async (req, res, next) => {
  const result = await Rate.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchRate = async (req, res, next) => {
//   let Rate = await Rate.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Rate);
// };
