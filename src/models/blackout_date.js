const mongoose = require("mongoose");

const blackoutDateSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  dates: [
    {
      date: {
        type: String,
        require: true,
      },
    },
  ],
});

const BlackoutDate = mongoose.model("BlackoutDate", blackoutDateSchema);

exports.BlackoutDate = BlackoutDate;
