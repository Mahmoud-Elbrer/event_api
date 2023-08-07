const _ = require("lodash");
const { Book } = require("../models/book");
const {
  HistoryTransactionMoney,
} = require("../models/history_transaction_money");
var send_notification = require("../helpers/send_notification");
const { Company } = require("../models/compnay");
const config = require("config");
var variables = require("../config/variables");
const axios = require("axios");
var constants = require("../helpers/constants");

exports.payToCompany = async (req, res, next) => {
  let book = await Book.find({ _id: req.params.bookId });
  for (const key in book[0].cart) {
    let company = await Company.find({ _id: book[0].cart[key]["company"] });
    const DATA = {
      SupplierCode: company[0].supplierCode,
      TransferAmount: book[0].cart[key]["price"],
      TransferType: "push",
      InternalNotes: "Notes",
    };

    const HEADER = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + config.get("myfatoorahTestKey"),
        "Content-Type": "application/json",
      },
    };

    axios
      .post(variables.Myfatoorah_API_URL + "/v2/TransferBalance", DATA, HEADER)
      .then(async (response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("------------DONE----------");
          // console.log(response.data.IsSuccess);
          console.log(book[0].cart[key]._id);
          console.log(response.data);
          console.log(DATA);
          if (response.data.IsSuccess == true) {
            // TODO : update status
            book[0].cart[key].statusCompany = constants.PAID_PAYMENT;
            Book.updateOne({ orderId: book[0].orderId }, { $set: book[0] })
              .then((result) => {})
              .catch((err) => {});
            // TODO : save InvoiceId  to DB
            const historyTransactionMoney = new HistoryTransactionMoney({
              orderId: book[0].orderId,
              orderItem: book[0].cart[key]._id,
              InvoiceId: response.data.Data.InvoiceId,
              Date: response.data.Data.Date,
            });

            await historyTransactionMoney.save();
          }
        }
      })
      .catch((e) => {
        console.log("------------Fail----------");
        console.log(book[0].cart[key]._id);
        //console.log(e);
      });
  }

  res.status(200).json({
    status: true,
  });
};