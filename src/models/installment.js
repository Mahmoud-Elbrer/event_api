const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  paymentMethod: {
    type: String,
    require: true,
  },
  referenceNumber: {
    type: String,
    require: true,
  },
  status: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
});

const Installment = mongoose.model("Installment", installmentSchema);

exports.Installment = Installment;
