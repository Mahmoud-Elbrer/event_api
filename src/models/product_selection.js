const mongoose = require("mongoose");

const productSelectionSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  selectionTitle: {
    type: String,
    require: true,
  },
  selectionTitleEn: {
    type: String,
  },

  selectionDescription: {
    type: String,
    require: true,
  },
  selectionDescriptionEn: {
    type: String,
  },
  cost: {
    type: String,
  },
  img: {
    type: String,
    // require: true,
  },  
});

const ProductSelection = mongoose.model("ProductSelection", productSelectionSchema);

exports.ProductSelection = ProductSelection;
