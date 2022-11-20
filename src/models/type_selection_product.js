const mongoose = require("mongoose");

const typeSelectionProductSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  name: {
    type: String,
    require: true,
  },
  nameEn: {
    type: String,
    require: true,
  }, 
});

const TypeSelectionProduct = mongoose.model("TypeSelectionProduct", typeSelectionProductSchema);

exports.TypeSelectionProduct = TypeSelectionProduct;
