const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    require: true,
  },
  otpCode: {
    type: Number,
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
