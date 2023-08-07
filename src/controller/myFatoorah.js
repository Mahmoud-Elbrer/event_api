const https = require("https");
const axios = require("axios");
const config = require("config");
var variables = require("../config/variables");
const { User } = require("../models/user");
//var book = require("../controller/book");
const { Book } = require("../models/book");
const orderId = require("order-id")("key");

exports.sendPayment = async (req, res, next) => {
  let user = await User.findOne({ _id: req.user._id });

  //console.log(user);
  console.log(req.body);

  console.log("parse");
  var s = JSON.stringify(req.body);

  // save to db

  let now = new Date();

  const id = orderId.generate();

  const book = new Book({
    user: req.user._id,
    paymentMethod: req.body.paymentMethod,
    typePaymentMethod: req.body.typePaymentMethod,
    paymentId: req.body.paymentId,
    totalCartAmount: req.body.totalCartAmount,
    organizingCompanyId: req.body.organizingCompanyId,
    organizingCompanyIdAmount: req.body.organizingCompanyIdAmount,
    orderId: orderId.getTime(id),
    createdAt: now,
    cart: req.body.cart,
  });

  const result = await book.save();

  console.log("result:::::");
  console.log(result._id);

  const DATA = {
    NotificationOption: "ALL",
    CustomerName: user.name,
    DisplayCurrencyIso: "AED",
    MobileCountryCode: "+971",
    CustomerMobile: user.phone.substring(1), //  like this format  : 521479726
    CustomerEmail: user.email,
    InvoiceValue: 100, //  req.body.InvoiceValue
    CallBackUrl:
      "http://192.168.0.106:3000/api/myFatoorah/paymentCallBack/success/" +
      result._id +
      "/" +
      req.user._id, // call methode paymentCallBack  // https://emr.local/api/myFatoorah/paymentCallBack
    //return : "http://192.168.0.106:3000/api/myFatoorah/paymentCallBack/data/"+ s +"/" + req.user._id, // call methode paymentCallBack  // https://emr.local/api/myFatoorah/paymentCallBack
    ErrorUrl:
      "http://192.168.0.106:3000/api/myFatoorah/paymentErrorUrlCallBack/error/" +
      result._id,
    Language: "ar", //req.body.Language
    //InvoiceItems: [ { ItemName: 'Product 01', Quantity: 1, UnitPrice: 100 } ]
  };
  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };
  axios
    .post(variables.Myfatoorah_API_URL + "/v2/SendPayment", DATA, HEADER)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        // console.log("Req body:", response.data);
        // console.log("Req header :", response.headers);
        //console.log(response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.paymentCallBack = async (req, res, next) => {
  console.log("paymentCallBack");
  console.log(req.params);
  console.log(req.params.resultId);
  console.log(req.params.user);

  res.status(200).json({
    success: true,
    message: "تم الدفع بنجاح  | Done Payment",
  });
};

exports.paymentErrorUrlCallBack = async (req, res, next) => {
  // remove form DB
  console.log("paymentErrorUrlCallBack");
  console.log(req.params.resultId);

  const result = await Book.deleteOne({ _id: req.params.resultId });

  res.status(400).json({
    success: false,
    message: "فشل في عملية الدفع | Invalid email or password",
  });
  // console.log(req);
};

exports.paymentStatus = async (req, res, next) => {
  const DATA = {
    Key: req.params.paymentId,
    KeyType: "PaymentId", //  or by InvoiceId
  };

  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };

  axios
    .post(variables.Myfatoorah_API_URL + "/v2/getPaymentStatus", DATA, HEADER)
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        // console.log("Req body:", response.data);
        // console.log("Req header :", response.headers);
        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};
