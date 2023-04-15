const mongoose = require("mongoose");

const historyReplaceCompanySchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  orderId: {
    type: String,
    // require: true,
  }, 
  orderItem: {
    type: String,
    // require: true,
  }, 
  createAt: {
    type: String,
    // require: true,
  },  
});

const HistoryReplaceCompany = mongoose.model("HistoryReplaceCompany", historyReplaceCompanySchema);

exports.HistoryReplaceCompany = HistoryReplaceCompany;
