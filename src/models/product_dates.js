const mongoose = require("mongoose");

const productDatesSchema = new mongoose.Schema({
  emirate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emirate",
    require: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    require: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
  dates: [
    {
      date: {
        type: String,
        require: true,
      },
    },
  ],
  productTitle: {
    type: String,
    require: true,
  },
  productTitleEn: {
    type: String,
  },

  productDescription: {
    type: String,
    require: true,
  },
  productDescriptionEn: {
    type: String,
  },
  cost: {
    type: String,
  },
  images: {
    type: String,
  },
  // images: [
  //   {
  //     imageUrl: {
  //       type: String,
  //      // require: true,
  //     },
  //   },
  // ],
  available: {
    type: Boolean,
    //require: true,
  },
  additionalNotes: {
    type: String,
  },
  additionalNotesEn: {
    type: String,
  },
  assets: [
    {
      assets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    },
  ],
  location: {
    type: String,
    require: true,
  },
  locationEn: {
    type: String,
  },
  longitude: {
    type: String,
    require: true,
  },
  Latitude: {
    type: String,
    require: true,
  },
});

const ProductDates = mongoose.model("ProductDates", productDatesSchema);

exports.ProductDates = ProductDates;
