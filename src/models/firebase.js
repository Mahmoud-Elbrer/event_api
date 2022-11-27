const mongoose = require("mongoose");

const firebaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

const Firebase = mongoose.model("Firebase", firebaseSchema);

exports.Firebase = Firebase;
