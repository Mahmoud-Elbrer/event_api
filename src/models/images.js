const mongoose = require("mongoose");

const agarImagesSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    require: true,
  },
  agar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agar",
    require: true,
  },
});

const AgarImages = mongoose.model("AgarImages", agarImagesSchema);

exports.AgarImages = AgarImages;