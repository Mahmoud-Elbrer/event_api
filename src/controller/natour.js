const _ = require("lodash");
const { Natour } = require("../models/natour");


exports.getNatour = async (req, res, next) => {
  let natour = await Natour.find();
  res.status(200).json(natour);
};

exports.addNatour = async (req, res, next) => {
  const natour = new Natour({
    user: req.user._id,
    name: req.body.name,
    nationality: req.body.nationality,
    phone: req.body.phone,
    lat: req.body.lat,
    lng: req.body.lng,
    typeRoom: req.body.typeRoom,
    city: req.body.city,
  });

  const result = await natour.save();

  res.status(200).json({
    success: true,
  });
};