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
  },
  productSelection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSelection",
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
  },
});

const Rate = mongoose.model("Rate", rateSchema);

exports.Rate = Rate;
