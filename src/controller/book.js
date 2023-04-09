const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");
const orderId = require("order-id")("key");
var send_notification = require('../helpers/send_notification');
var constants = require("../helpers/constants");

exports.getBook = async (req, res, next) => {
  let book = await Book.find({ user: req.user._id });

  res.status(200).json(book);
};

exports.getOrderCompany = async (req, res, next) => {
  let book = await Book.find();

  //console.log(book);

  var newAr = [];
  for (var index in book) {
    for (const key in book[index].cart) {
      if (
        book[index].cart[key]["company"] == req.user._id &&
        book[index].cart[key]["statusCompany"] == req.params.status
      ) {
        var cartUser = book[index].cart[key];
        var bookUser = book[index].user;
        var orderId = book[index].orderId;
        var organizingCompanyId = book[index].organizingCompanyId;
        var object = {
          user: bookUser,
          orderId: orderId,
          organizingCompany: organizingCompanyId,
          item: cartUser,
        };
        newAr.push(object);
      }
    }
  }

  //console.log(newAr);

  res.status(200).json(newAr);
};

exports.getOrganizedCorporateOrder = async (req, res, next) => {
  let book = await Book.find({ organizingCompanyId: req.user._id }); //  63ad97e6d5110219b7d199a0
  // let book = await Book.find({ organizingCompanyId: "63ad976ad5110219b7d1999d" });

  console.log(book);
  res.status(200).json(book);
};

exports.updateStatusCompany = async (req, res, next) => {
  let book = await Book.find({ orderId: req.body.orderId });

  let getTitle;
  let getTitleEn;
  let getCompany;
  let getOrderId;

  for (const key in book[0].cart) {
    // console.log(book[0].cart[key].id);
    if (book[0].cart[key].id == req.body.itemId) {
      if (req.user.typeCompany == "1" || req.user.typeCompany == "2") {
        book[0].cart[key].statusCompany = req.body.status;
      } else {
        book[0].cart[key].statusOrganizedCompany = req.body.status;
      }
      getTitle = book[0].cart[key].title;
      getTitle = book[0].cart[key].titleEn;
      getOrderId = book[0].cart[key].id;
      getCompany = book[0].cart[key].company;
    }
  }

  Book.updateOne({ orderId: req.body.orderId }, { $set: book[0] })
    .then((result) => {
      console.log("Re result");
      console.log(result);
      if (result) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
          cart: book[0].cart,
        });

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const createdAt = year +  "-" + month + "-" +  date +" " +hours + ":" +  minutes + ":" + seconds;

        if (req.user.typeCompany == "1" || req.user.typeCompany == "2") {
          send_notification.sendNotificationUpdatedStatus(
            req,
            book[0].organizingCompanyId,
            getCompany,
            createdAt,
            book[0]._id,
            getOrderId,
            getTitle,
            getTitleEn,
            req.body.status, // statusCompany
            0
          ) ;
        } else {
          send_notification.sendNotificationUpdatedStatus(
            req,
            getCompany,
            book[0].organizingCompanyId,
            createdAt,
            book[0]._id,
            getOrderId,
            0,
            getTitle,
            getTitleEn,
            req.body.status // statusOrganizedCompany
          ) ;

        }
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
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

exports.replaceCompany = async (req, res, next) => {
  let book = await Book.find({ orderId: req.body.orderId });

  for (const key in book[0].cart) {
    //console.log(book[0].cart[key].id);
    if (book[0].cart[key].id == req.body.itemId) {
      book[0].cart[key].company = req.body.company;
      book[0].cart[key].statusCompany = constants.PENDING;
    }
  }

  Book.updateOne({ orderId: req.body.orderId }, { $set: book[0] })
    .then((result) => {
      console.log("Re result");
      console.log(result);
      if (result) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
          cart: book[0].cart,
        });
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
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

exports.replaceOrganizedCompany = async (req, res, next) => {
  console.log("replaceOrganizedCompany");
  let book = await Book.find({ orderId: req.body.orderId });

  book[0].organizingCompanyId = req.body.organizingCompanyId;

  for (const key in book[0].cart) {
    book[0].cart[key].statusOrganizedCompany = constants.PENDING;
  }

  Book.updateOne({ orderId: req.body.orderId }, { $set: book[0] })
    .then((result) => {
      console.log("Re result");
      console.log(result);
      if (result) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
          cart: book[0].cart,
        });
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
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

exports.addBook = async (req, res, next) => {
  // const { error } = validateAddBook(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  const createdAt =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const id = orderId.generate();

  const book = new Book({
    user: req.user._id,
    paymentId: req.body.paymentId,
    totalCartAmount: req.body.totalCartAmount,
    organizingCompanyId: req.body.organizingCompanyId,
    organizingCompanyIdAmount: req.body.organizingCompanyIdAmount,
    orderId: orderId.getTime(id),
    createdAt: createdAt,
    cart: req.body.cart,
  });

  const result = await book.save();

    res.status(200).json({
    success: true,
    result: result,
  });

  // todo : should send notification to user oder
  send_notification.sendNotificationBooking(req, req.body.cart, req.user._id, createdAt, 1, 1);
  if (req.body.organizingCompanyId == "") {
  } else {
    send_notification.sendNotificationBooking(req, req.body.cart, organizingCompanyId, createdAt, 1, 1);
  }

};



exports.searchOrderCompany = async (req, res, next) => {
  console.log("searchOrderCompany");
  let book = await Book.find();

  //console.log(book);

  var newAr = [];
  for (var index in book) {
    for (const key in book[index].cart) {
      if (
        book[index].cart[key]["company"] == req.user._id &&
        book[index].cart[key]["code"] == req.params.code
      ) {
        var cartUser = book[index].cart[key];
        var bookUser = book[index].user;
        var orderId = book[index].orderId;
        var organizingCompanyId = book[index].organizingCompanyId;
        var object = {
          user: bookUser,
          orderId: orderId,
          organizingCompany: organizingCompanyId,
          item: cartUser,
        };
        newAr.push(object);
      }
    }
  }

  //console.log(newAr);

  res.status(200).json(newAr);
};

exports.deleteBook = async (req, res, next) => {
  const result = await Book.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
  d;
};



