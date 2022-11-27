const _ = require("lodash");
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");

exports.getNotification = async (req, res, next) => {
  let notification = await Notification.find({
    receiverId: req.user._id,
  }).populate("senderId", "name email");

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
    firebase
      .updateOne({ user: req.user._id }, { $set: firebase })
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
  //let token = await Firebase.find({ user: req.body.receiverId });
  // if (!token) return res.status(400).send("User Not Found");

  var toke =
    "cbnk_B2tRjev2i5G8DBCk7:APA91bFxjHgAj3PSZp9xJFhJ4hjbHKAW5mTtLTOnbafR_ErZOJJVyLUJKEDYBE2qpVGg3m43r_NvTG_AJhBQoio1S2dS7yaXZQkLRv1WBKPfRSkBVjE-EOINLce-mN6rxQn7t3WKc2_2";
  var message = {
    to: toke, // token[0].firebaseToken,
    notification: {
      title: "this title",
      body: "this message",
    },

    data: {
      title: "You Have Order",
      body: '{"name" : "You Have New Order","orderId" : "123","area" : "sudan khartoum "}',
    },
  };

  fcm.send(message, function (err, response) {
    if (!err) return res.status(400).json({ success: false });

    console.log(err);

    const notification = Notification(
      _.pick(req.body, ["senderId", "receiverId", "typeNotification"])
    );

    const result = notification.save();

    return res
      .status(200)
      .json({ success: true, err: err, response: response, result: result });
  });
};
