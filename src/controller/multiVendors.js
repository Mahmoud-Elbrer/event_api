const https = require("https");
const axios = require("axios");
const config = require("config");
var variables = require("../config/variables");
const { Company } = require("../models/compnay");

exports.createSupplier = async (req, res, next) => {
  const DATA = {
    SupplierName: req.body.SupplierName,
    Mobile: req.body.Mobile,
    Email: req.body.Email,
    CommissionValue: req.body.CommissionValue,
    CommissionPercentage: req.body.CommissionPercentage,
    DepositTerms: req.body.DepositTerms,
    BankId: req.body.BankId,
    BankAccountHolderName: req.body.BankAccountHolderName,
    BankAccount: req.body.BankAccount,
    Iban: req.body.Iban,
    IsActive: req.body.IsActive,
  };
  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };
  axios
    .post(variables.Myfatoorah_API_URL + "/v2/CreateSupplier", DATA, HEADER)
    .then(async (response) => {
      if (response.status === 200 || response.status === 201) {
        // console.log("Req body:", response.data);
        // console.log("Req header :", response.headers);
        await Company.updateOne(
          { _id: req.user._id },
          {
            $set: {
              supplierCode: response.data.Data.SupplierCode,
            },
          }
        );

        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(400).json(e);
    });
};

exports.uploadSupplierDocument = async (req, res, next) => {
  const DATA = {
    FileUpload: req.body.FileUpload,
    FileType: req.body.FileType, //  int
    //ExpireDate: "xxxx",
    SupplierCode: req.body.SupplierCode, 
  };

  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };

  axios
    .post(
      variables.Myfatoorah_API_URL + "/v2/UploadSupplierDocument",DATA,HEADER)
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

exports.getSupplierDashboard = async (req, res, next) => {
  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };

  axios
    .get(
      variables.Myfatoorah_API_URL +
        "/v2/GetSupplierDashboard?SupplierCode=" +
        req.params.supplierCode,
      HEADER
    )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

exports.GetSupplierDeposits = async (req, res, next) => {
  const HEADER = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + config.get("myfatoorahTestKey"),
      "Content-Type": "application/json",
    },
  };

  axios
    .get(
      variables.Myfatoorah_API_URL +
        "/v2/GetSupplierDashboard?SupplierCode=2279",
      HEADER
    )
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        res.status(200).json(response.data);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

exports.transferBalance = async (req, res, next) => {
  const DATA = {
    SupplierCode: req.body.SupplierCode,
    TransferAmount: req.body.TransferAmount,
    TransferType: req.body.TransferType,
    InternalNotes: req.body.InternalNotes,
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
