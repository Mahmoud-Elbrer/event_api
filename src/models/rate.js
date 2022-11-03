const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  numRate: {
    type: Number,
    require: true,
  },
});

const Rate = mongoose.model("Rate", rateSchema);

exports.Rate = Rate;
