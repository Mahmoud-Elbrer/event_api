const mongoose = require("mongoose");

const subscribeProductServiceSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    require: true,
  },
});

const SubscribeProductService = mongoose.model("SubscribeProductService", subscribeProductServiceSchema);

exports.SubscribeProductService = SubscribeProductService;
