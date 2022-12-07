const mongoose = require("mongoose");

const subscribeServiceSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    require: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    require: true,
  },
});

const SubscribeService = mongoose.model("SubscribeService", subscribeServiceSchema);

exports.SubscribeService = SubscribeService;
