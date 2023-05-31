const mongoose = require("mongoose");

const HistoryTransactionMoneySchema = new mongoose.Schema({
  orderId: {
    type: String,
    // require: true,
  },
  orderItem: {
    type: String,
    // require: true,
  },  
  InvoiceId: {
    type: String,
    // require: true,
  }, 
  Date: {
    type: String,
    // require: true,
  },  
});

const HistoryTransactionMoney = mongoose.model("HistoryTransactionMoney", HistoryTransactionMoneySchema);

exports.HistoryTransactionMoney = HistoryTransactionMoney;
