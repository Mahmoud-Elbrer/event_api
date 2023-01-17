const mongoose = require("mongoose");

const subscribeProductEmirateSchema = new mongoose.Schema({
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
  emirate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emirate",
    require: true,
  },
});

const SubscribeProductEmirate = mongoose.model("SubscribeProductEmirate", subscribeProductEmirateSchema);

exports.SubscribeProductEmirate = SubscribeProductEmirate;
