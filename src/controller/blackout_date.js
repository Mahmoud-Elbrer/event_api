const _ = require("lodash");
const { BlackoutDate } = require("../models/blackout_date");
const { validateAddBlackoutDate } = require("../validations/validations");

exports.getBlackoutDate = async (req, res, next) => {
  let blackoutDate = await BlackoutDate.find({ product: req.params.Id });

  res.status(200).json(blackoutDate);
};

exports.addBlackoutDate = async (req, res, next) => {

  const blackoutDate = new BlackoutDate({
    product: req.body.product,
    dates: req.body.dates,
  });


  const result = await blackoutDate.save();

  
  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteBlackoutDate = async (req, res, next) => {
  const result = await BlackoutDate.deleteOne({ _id: req.params.Id });

  console.log(result);

  res.status(200).json({
    success: true,
  });
};
