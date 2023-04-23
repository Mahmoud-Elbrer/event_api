const _ = require("lodash");
const { Installment } = require("../models/installment");
const { validateAddInstallment } = require("../validations/validations");

exports.getInstallment = async (req, res, next) => {
  let installment = await Installment.find();

  res.status(200).json(installment);
};

exports.getInstallmentByOrderId = async (req, res, next) => {
  let installment = await Installment.find({ book: req.params.Id });

  res.status(200).json(installment);
};

// calling form other method
exports.addInstallment = async (
  req,
  res,
  bookId,
  amount,
  date,
  status,
  paymentMethod,
  next
) => {
  let createdAt;
  if (req.body.paymentId == "") {
    createdAt = "";
  } else {
    createdAt = new Date();
  }

  const installment = new Installment({
    user: req.user._id,
    book: bookId,
    date: date,
    amount: amount,
    paymentMethod: paymentMethod,
    referenceNumber: req.body.paymentId,
    status: status,
    createdAt: createdAt,
  });

  await installment.save();
};

exports.updateInstallment = async (req, res, next) => {
  let createdAt = new Date();

  const newInstallment = {
    _id: req.body.Id,
    status: req.body.status,
    createdAt: createdAt,
    paymentMethod: req.body.paymentMethod,
  };

  Installment.updateOne({ _id: req.body.Id }, { $set: newInstallment })
    .then((result) => {
      console.log("Re result");
      console.log(result);
      if (result.modifiedCount == 1) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
        });
      } else {
        res.status(200).json({
          message: "فشل التحديث | Fail Updating ",
          success: false,
        });
      }
    })
    .catch((err) => {
      console.log("err");
      console.log(err);
      res.status(404).json({
        message: "Error Connection  " + err,
        success: false,
      });
    });
};
