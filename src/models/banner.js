const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  img: {
    type: String,
  },  
});

const Banner = mongoose.model("Banner", bannerSchema);

exports.Banner = Banner;
