const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
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
  productType: {
    type: String,
    require: true,
  },
  isPercent: {
    type: Boolean,
    // require: true,
  },
  img: {
    type: String,
  },  
  
});

const Service = mongoose.model("Service", serviceSchema);

exports.Service = Service;
