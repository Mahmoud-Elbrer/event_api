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