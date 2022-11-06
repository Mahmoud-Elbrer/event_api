const mongoose = require("mongoose");

const assetsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  nameEn: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    // require: true,
  },  
});

const Assets = mongoose.model("Assets", assetsSchema);

exports.Assets = Assets;
