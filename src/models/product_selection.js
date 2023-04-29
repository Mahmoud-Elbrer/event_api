const mongoose = require("mongoose");

const productSelectionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  typeSelectionProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeSelectionProduct",
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
  img: String,  
  img1: String,  
  img2: String,  
  img3: String,  
  img4: String,  
  img5: String,  
  categories: {
    type: Array,
  },
  categoriesEn: {
    type: Array,
  },
  categoriesCost: {
    type: Array,
  },
  choices: {
    type: Array,
  },
  choicesEn: {
    type: Array,
  },
  
});

const ProductSelection = mongoose.model("ProductSelection", productSelectionSchema);

exports.ProductSelection = ProductSelection;
