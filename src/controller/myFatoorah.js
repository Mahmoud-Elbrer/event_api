const https = require("https");
const axios = require("axios");
const config = require("config");
var variables = require("../config/variables");

exports.sendPayment = async (req, res, next) => {
  const DATA = {
    NotificationOption: "ALL",
    CustomerName: req.body.CustomerName,
    DisplayCurrencyIso: req.body.DisplayCurrencyIso,
    MobileCountryCode: "+971",
    CustomerMobile: req.body.CustomerMobile, //  like this format  : 521479726
    CustomerEmail: req.body.CustomerEmail,
    InvoiceValue: req.body.InvoiceValue,
    CallBackUrl: "http://192.168.0.107:3000/api/myFatoorah/paymentCallBack", // call methode paymentCallBack  // https://emr.local/api/myFatoorah/paymentCallBack
    ErrorUrl:"http://192.168.0.107:3000/api/myFatoorah/paymentErrorUrlCallBack/error",
    Language: req.body.Language,
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
        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.paymentCallBack = async (req, res, next) => {
  console.log("paymentCallBack");
  console.log(req.query.paymentId);
  // res.status(200).json(req);
};

exports.paymentErrorUrlCallBack = async (req, res, next) => {
  console.log("paymentErrorUrlCallBack");
  //res.status(400).json(req);
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

  axios.post(variables.Myfatoorah_API_URL +"/v2/getPaymentStatus", DATA, HEADER).then((response) => {
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
