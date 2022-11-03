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
  img: {
    type: String,
    require: true,
  },  
});

const Service = mongoose.model("Service", serviceSchema);

exports.Service = Service;
