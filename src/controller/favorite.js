const _ = require("lodash");
const { Favorite } = require("../models/favorite");
const { validateAddFavorite } = require("../validations/validations");

exports.getFavorite = async (req, res, next) => {
  // let favorite = await Favorite.find({ user: req.user._id });
  let favorite = await Favorite.find({ user: req.user._id })
    .populate("product")
    .populate("user", "-password");
  // if (!user) return res.status(400).send("Invalid email or password");

  // var s ;
  // for (const item of favorite) {
  //   res.status(200).json(item['product']);
  // };

  res.status(200).json(favorite);
};

exports.addFavorite = async (req, res, next) => {

  let fav = await Favorite.findOne({ user: req.user._id  ,  product : req.params.Id });
  if (fav)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });

  const favorite = new Favorite({
    user: req.user._id,
    product: req.params.Id,
  });

  const result = await favorite.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteFavorite = async (req, res, next) => {
  console.log(req.params.Id );
  const result = await Favorite.deleteOne({ _id: req.params.Id });

  console.log(result);

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchFavorite = async (req, res, next) => {
//   let Favorite = await Favorite.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(Favorite);
// };
