const _ = require("lodash");
const { Rate } = require("../models/rate");
const { validateAddRate } = require("../validations/validations");

exports.getRate = async (req, res, next) => {
  let rate = await Rate.find({ user: req.user._id });
  // let book = await Book.find({ user: req.user._id }).populate("doctor", "-password").populate("user", "-password").populate("timeTableId");  
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(rate);
};

exports.addRate = async (req, res, next) => {
  const { error } = validateAddRate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rate = Rate(_.pick(req.body, ["user", "product" ,"numRate"]));

  const result = await rate.save();

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
