const _ = require("lodash");
const { SubscribeProductService } = require("../models/subscribe_product_service");
const { validateAddSubscribeProductService } = require("../validations/validations");

exports.getSubscribeProductService = async (req, res, next) => {
  let subscribeProductService = await SubscribeProductService.find({ product: req.params.productId , service: req.params.serviceId  })
    .populate("product")
    .populate("service");


  res.status(200).json(subscribeProductService);
};

exports.addSubscribeProductService = async (req, res, next) => {

  let sub = await SubscribeProductService.findOne({ product: req.body.product  ,  service : req.body.service });
  if (sub)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });

 
  const subscribeProductService = SubscribeProductService(_.pick(req.body, [ "product" ,"service"]));

  const result = await subscribeProductService.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteSubscribeProductService = async (req, res, next) => {
  console.log(req.params.Id );
  const result = await SubscribeProductService.deleteOne({ _id: req.params.Id });

  console.log(result);

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchSubscribeProductService = async (req, res, next) => {
//   let SubscribeProductService = await SubscribeProductService.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(SubscribeProductService);
// };
