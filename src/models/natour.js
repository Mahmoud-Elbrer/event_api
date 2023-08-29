const mongoose = require("mongoose");

const natourSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  nationality: { type: String },
  phone: { type: String },
  lat: { type: String },
  lng: { type: String },
  typeRoom: { type: String },
  city: { type: String },
});

const Natour = mongoose.model("Natour", natourSchema);

exports.Natour = Natour;
