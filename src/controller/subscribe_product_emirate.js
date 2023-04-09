const _ = require("lodash");
const { SubscribeProductEmirate } = require("../models/subscribe_product_emirate");
const { validateAddSubscribeProductEmirate } = require("../validations/validations");

exports.getSubscribeProductEmirate = async (req, res, next) => {
  let subscribeProductEmirate = await SubscribeProductEmirate.find({ service: req.params.serviceId , emirate: req.params.emirateId  })
    .populate("product")
    .populate("service");

  //  // console.log(subscribeProductEmirate);
  //   let x ; 
  //   subscribeProductEmirate.forEach(element => {
  //    // console.log(element);
  //   });
    
  res.status(200).json(subscribeProductEmirate);
};

exports.searchSubscribeProductEmirate = async (req, res, next) => {
  let service = await Service.find({ event: req.params.Id });
  let subscribeProductEmirate = await SubscribeProductEmirate.find({ service: req.params.serviceId , emirate: req.params.emirateId  })
    .populate("product")
    .populate("service");

  res.status(200).json({
    service : service , 
    products :  subscribeProductEmirate
  });
};


exports.getEmirateByProductId = async (req, res, next) => {
  let emirate = await SubscribeProductEmirate.find({ product: req.params.productId })
    .populate("emirate");


  res.status(200).json(emirate);
};

exports.addSubscribeProductEmirate = async (req, res, next) => {
  let sub = await SubscribeProductEmirate.findOne({ product: req.body.product  ,  emirate : req.body.emirate });
  if (sub)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });

 
  const subscribeProductEmirate = SubscribeProductEmirate(_.pick(req.body, [  "product" ,"service" ,"emirate"]));

  const result = await subscribeProductEmirate.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteSubscribeProductEmirate = async (req, res, next) => {
  console.log(req.params.Id );
  const result = await SubscribeProductEmirate.deleteOne({ _id: req.params.Id });

//  console.log(result);

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchSubscribeProductEmirate = async (req, res, next) => {
//   let SubscribeProductEmirate = await SubscribeProductEmirate.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(SubscribeProductEmirate);
// };
