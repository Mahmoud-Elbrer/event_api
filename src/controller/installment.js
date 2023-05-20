const _ = require("lodash");
const { Installment } = require("../models/installment");
const { Book } = require("../models/book");
const { validateAddInstallment } = require("../validations/validations");
var constants = require("../helpers/constants");

exports.getBookInstallment = async (req, res, next) => {
  let book = await Book.find();

  var newAr = [];
  for (let index = 0; index < book.length; index++) {
    if(book[index].typePaymentMethod == constants.DeferredPaymentMethod){
   //   book  =  book[index].id ; 
      var object = {
        book:  book[index].id,
        orderId:  book[index].orderId,
        createdAt: book[index].createdAt,
      };
      newAr.push(object);
    }
  }
  
 // let installment = await Installment.find();

  res.status(200).json(newAr);
};

exports.getInstallmentByOrderId = async (req, res, next) => {
  let installment = await Installment.find({ book: req.params.Id });

  res.status(200).json(installment);
};

// calling form other method
exports.addInstallment = async (req,res,bookId,amount,date,status,paymentMethod,next) => {
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
    id: req.body.id,
    status: req.body.status,
    createdAt: createdAt,
    paymentMethod:req.body.paymentMethod,
    referenceNumber:req.body.referenceNumber,
  };

  console.log(newInstallment);

  Installment.updateOne({ _id: req.body.id }, { $set: newInstallment })
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



exports.addCompanyInstallment = async (companyId,res,bookId,amount,date,status,paymentMethod,next) => {

  const installment = new Installment({
    user: companyId,
    book: bookId,
    date: date,
    amount: amount,
    paymentMethod: paymentMethod,
    referenceNumber: '',
    status: status,
    createdAt: '',
  });

  await installment.save();
};


