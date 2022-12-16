const mongoose = require("mongoose");

const CategorySelectionSchema = new mongoose.Schema({
  productSelection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSelection",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  nameEn: {
    type: String,
    require: true,
  },
  cost: {
    type: String,
  },
  img: {
    type: String,
  },  
});

const CategorySelection = mongoose.model("CategorySelection", CategorySelectionSchema);

exports.CategorySelection = CategorySelection;
