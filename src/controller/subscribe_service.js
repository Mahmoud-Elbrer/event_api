const _ = require("lodash");
const { SubscribeService } = require("../models/subscribe_service");
const { validateAddSubscribeService } = require("../validations/validations");

exports.getSubscribeService = async (req, res, next) => {
  let subscribeService = await SubscribeService.find({ event: req.params.eventId })
    .populate("event")
    .populate("service");


  res.status(200).json(subscribeService);
};

exports.addSubscribeService = async (req, res, next) => {

  let sub = await SubscribeService.findOne({ event: req.body.event  ,  service : req.body.service });
  if (sub)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });

 
  const subscribeService = SubscribeService(_.pick(req.body, [ "event" ,"service"]));

  const result = await subscribeService.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteSubscribeService = async (req, res, next) => {
  console.log(req.params.Id );
  const result = await SubscribeService.deleteOne({ _id: req.params.Id });

  console.log(result);

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchSubscribeService = async (req, res, next) => {
//   let SubscribeService = await SubscribeService.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(SubscribeService);
// };
