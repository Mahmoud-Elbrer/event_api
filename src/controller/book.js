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

  //console.log(book);

  var newAr = [];
  for (var index in book) {
    for (const key in book[index].cart) {
      // if (book[index].cart[key]["id"] == "638282244fbad7fad3c46d24") {
      if (book[index].cart[key]["company"] == req.user._id) {
        var cartUser = book[index].cart[key];
        var bookUser = book[index].user;
        var organizingCompanyId = book[index].organizingCompanyId;
        var object = { user: bookUser, organizingCompany : organizingCompanyId , item: cartUser };
        newAr.push(object);
      }
    }
  }

  //console.log(newAr);

  res.status(200).json(newAr);
};

exports.getOrganizedCorporateOrder = async (req, res, next) => {
  let book = await Book.find({ organizingCompanyId: req.user._id}); //  63ad97e6d5110219b7d199a0
  // let book = await Book.find({ organizingCompanyId: "63ad976ad5110219b7d1999d" });

  console.log(book);
  res.status(200).json(book);
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
  sendNotification(req, req.body.cart, req.user._id);
  if(req.body.organizingCompanyId == ''){

  }else {
    sendNotification(req, req.body.cart, req.user._id);
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





async function sendNotification(req, cart, userId) {
  for (const key in cart) {
    console.log(cart[key]["company"]);

    let user = await Firebase.findOne({ user: cart[key]["company"] });

    let statusTitle = "You Have request | لديك طلب ";
    req.body.body = cart[key]["titleEn"] + " | " + cart[key]["title"];

    var toke = user.token;
    var message = {
      to: toke, // token[0].firebaseToken,
      notification: {
        title: statusTitle,
        body: req.body.body,
      },

      data: {
        title: statusTitle + req.body.title,
        body: req.body.body,
      },
    };

    fcm.send(message, function (err, response) {
      if (err) console.log(err);

      req.body.senderId = userId;
      req.body.receiverId = cart[key]["company"];
      req.body.title = cart[key]["title"];
      req.body.titleEn = cart[key]["titleEn"];
      req.body.orderId = cart[key]["orderId"];
      req.body.typeNotification = 0;
      const notification = Notification(
        _.pick(req.body, [
          "senderId",
          "receiverId",
          "title",
          "titleEn",
          "body",
          "orderId",
          "typeNotification",
        ])
      );

      notification.save();
    });
  }
}



