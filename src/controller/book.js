const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");
const orderId = require("order-id")("key");
// for Notification
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");

exports.getBook = async (req, res, next) => {
  let book = await Book.find({ user: req.user._id });

  res.status(200).json(book);
};

exports.getOrderCompany = async (req, res, next) => {
  let book = await Book.find();

  console.log("i am in getOrderCompany");
  console.log(req.user._id);
  console.log(req.params.status);

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
  console.log("am org");
  // console.log("status1");
  // console.log(req.params.status);
  let book = await Book.find({ organizingCompanyId: req.user._id }); //  63ad97e6d5110219b7d199a0
  // let book = await Book.find({ organizingCompanyId: "63ad976ad5110219b7d1999d" });

  console.log(book);
  res.status(200).json(book);
};

exports.updateStatusCompany = async (req, res, next) => {
  let book = await Book.find({ orderId: req.body.orderId });

  for (const key in book[0].cart) {
    console.log(book[0].cart[key].id);
    if (book[0].cart[key].id == req.body.itemId) {
      if (req.user.typeCompany == "1" || req.user.typeCompany == "2") {
        book[0].cart[key].statusCompany = req.body.status;
      } else {
        book[0].cart[key].statusOrganizedCompany = req.body.status;
      }
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

        let productName = book[0].cart[key].title ;
        let productNameEn = book[0].cart[key].titleEn;
        if (req.user.typeCompany == "1" || req.user.typeCompany == "2") {
          // company
          // req, receiverId, senderId , createdAt , orderId  ,itemId ,  productName  ,  statusCompany   ,statusOrganizedCompany
          sendNotificationUpdatedStatus(
            req,
            book[0].organizingCompanyId,
            book[0].cart[key].company,
            createdAt,
            book[0]._id,
            book[0].cart[key]._id,
            productName,
            productNameEn,
            book[0].cart[key].statusCompany,
            0
          );
        } else {
          sendNotificationUpdatedStatus(
            req,
            book[0].cart[key].company,
            book[0].organizingCompanyId,
            createdAt,
            book[0]._id,
            book[0].cart[key]._id,
            0,
            productName,
            productNameEn,
            book[0].cart[key].statusOrganizedCompany
          );
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

  // todo : should send notification to user oder
  sendNotification(req, req.body.cart, req.user._id, createdAt, 1, 1);
  if (req.body.organizingCompanyId == "") {
  } else {
    sendNotification(req, req.body.cart, req.user._id, createdAt, 1, 1);
  }

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteBook = async (req, res, next) => {
  const result = await Book.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
  d;
};

async function sendNotification(
  req,
  cart,
  userId,
  createdAt,
  statusCompany,
  statusOrganizedCompany
) {
  for (const key in cart) {
    console.log(cart[key]["company"]);

    let user = await Firebase.findOne({ user: cart[key]["company"] });

    let title = "You Have request | لديك طلب ";

    var toke = user.token;
    var message = {
      to: toke, // token[0].firebaseToken,
      notification: {
        title: title,
        body: req.body.body,
      },

      data: {
        title: title,
        body: req.body.body,
      },
    };

    fcm.send(message, function (err, response) {
      if (err) console.log(err);

      req.body.senderId = userId;
      req.body.receiverId = cart[key]["company"];
      req.body.title = title;
      req.body.body = cart[key]["titleEn"] + " | " + cart[key]["title"];
      req.body.orderId = cart[key]["orderId"];
      req.body.createdAt = createdAt;
      // req.body.itemId = cart[key]["cart"][];
      req.body.statusCompany = statusCompany;
      req.body.statusOrganizedCompany = statusOrganizedCompany;
      const notification = Notification(
        _.pick(req.body, [
          "senderId",
          "receiverId",
          "orderId",
          "createdAt",
          "title",
          "body",
          "statusCompany",
          "statusOrganizedCompany",
        ])
      );

      notification.save();
    });
  }
}

async function sendNotificationUpdatedStatus(
  req,
  receiverId,
  senderId,
  createdAt,
  orderId,
  itemId,
  productName,
  productNameEn,
  statusCompany,
  statusOrganizedCompany
) {
  let user = await Firebase.findOne({ user: receiverId });

  let title;
  if (statusOrganizedCompany = 0) {
    // here company
    switch (statusCompany) {
      case 2:
        title = "Order Accepted | تم قبول الطلب ";
        req.body.body = productNameEn + "Order Accepted  |  تم قبول الطلب ";
        break;
      case 3:
        title = "Order Rejected | تم رفض الطلب ";
        req.body.body = productNameEn + "Order Accepted | تم قبول الطلب ";
        break;
      default:
        break;
    }
  } else {
    // here company Org
    switch (statusOrganizedCompany) {
      case 2:
        title = "Order Accepted | تم قبول الطلب ";
        req.body.body = productNameEn + "Order Accepted | تم قبول الطلب ";
        break;
      case 3:
        title = "Order Rejected | تم رفض الطلب ";
        req.body.body =productNameEn + "Order Accepted | تم قبول الطلب ";
        break;
      default:
        break;
    }
  }

  var toke = user.token;
  var message = {
    to: toke, // token[0].firebaseToken,
    notification: {
      title: title,
      body: req.body.body,
    },

    data: {
      title: title,
      body: req.body.body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) console.log(err);

    req.body.senderId = senderId;
    req.body.receiverId = receiverId;
    req.body.title = title;
    req.body.body = productName;
    req.body.orderId = orderId;
    req.body.itemId = itemId;
    req.body.createdAt = createdAt;
    req.body.statusCompany = statusCompany;
    req.body.statusOrganizedCompany = statusOrganizedCompany;
    const notification = Notification(
      _.pick(req.body, [
        "senderId",
        "receiverId",
        "orderId",
        "itemId",
        "createdAt",
        "title",
        "body",
        "statusCompany",
        "statusOrganizedCompany",
      ])
    );

    notification.save();
  });
}
