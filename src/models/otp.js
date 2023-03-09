const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  phone: {
    type: String,
    require: true,
  },
  otpCode: {
    type: String,
    require: true,
  },

  otpTimesTamp: {
    type: String,
    require: true,
  },

  otpTries: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("OTP", otpSchema);
