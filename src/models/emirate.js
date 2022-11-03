const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  nameEn: {
    type: String,
    require: true,
  },
});

const Emirate = mongoose.model("Emirate", stateSchema);

exports.Emirate = Emirate;

