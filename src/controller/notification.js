const _ = require("lodash");
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");
const { User } = require("../models/user");
var constants = require("../helpers/constants");

exports.getNotification = async (req, res, next) => {
  let notification = await Notification.find({
    receiverId: req.user._id,
  });
  //.populate("senderId", "name email");

  res.status(200).json(notification);
};

exports.deleteNotification = async (req, res, next) => {
  const result = await Notification.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};

exports.addFireBaseToken = async (req, res, next) => {
  const firebase = new Firebase({
    user: req.user._id,
    token: req.params.token,
  });

  let user = await Firebase.findOne({ user: req.user._id });
  if (!user) {
    await firebase.save();

    res.status(200).json({
      success: true,
    });
  } else {
    const newFirebaseToken = {
      user: req.user._id,
      token: req.params.token,
    };

    Firebase.updateOne({ user: req.user._id }, { $set: newFirebaseToken })
      .then((result) => {
        console.log(result);
        if (result) {
          res.status(200).json({
            success: true,
            result: result,
          });
        } else {
          res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
        });
      });
  }
};

exports.sendNotification = async (req, res, next) => {
  let user = await Firebase.findOne({ user: req.body.receiverId });

  let statusTitle;

  switch (req.body.typeNotification) {
    case constants.ACCEPTED:
      statusTitle = " تم استلام طلبك ";
      req.body.body = "تم استلام طلبك  | Your request has been received";
      break;
    case constants.REJECTED:
      statusTitle = " تم رفض طلبك ";
      req.body.body = "تم رفض طلبك  | Your request has been rejected";
      break;
    default:
      statusTitle = " تم استلام طلبك ";
      req.body.body = "تم استلام طلبك  | Your request has been received";
      //console.log(`Sorry, we are out of ${expr}.`);
  }

  var toke = user.token;
  var message = {
    to: toke, // token[0].firebaseToken,
    notification: {
      title: statusTitle,
      body: statusTitle + req.body.title,
    },

    data: {
      title: statusTitle + req.body.title,
      body: req.body.body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) return res.status(400).json({ success: false });

    // re.body.receiverId = req.body.receiverId;
    req.body.senderId = req.user._id;
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

    const result = notification.save();

    return res
      .status(200)
      .json({ success: true, err: err, response: response, result: result });
  });
};