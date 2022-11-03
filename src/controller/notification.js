const _ = require("lodash");
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");
const { validateAddFireBaseToken } = require("../validations/validations");

exports.getNotification = async (req, res, next) => {
  let notification = await Notification.find({ receiverId: req.user._id }).populate("senderId" ,"name email");

  res.status(200).json(notification);
};

exports.deleteNotification = async (req, res, next) => {
  const result = await Notification.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};

exports.addFireBaseToken = async (req, res, next) => {
  const { error } = validateAddFireBaseToken(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const firebase = Firebase(_.pick(req.body, ["user", "firebaseToken"]));

  const result = await firebase.save();

  res.status(200).json({
    success: true,
  });
};

exports.sendNotification = async (req, res, next) => {
  let token = await Firebase.find({ user: req.body.receiverId });
  if (!token) return res.status(400).send("User Not Found");

  var message = {
    to: token[0].firebaseToken,
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
    const notification = Notification(
      _.pick(req.body, ["senderId", "receiverId", "typeNotification"])
    );

    const result = notification.save();

    return res
      .status(200)
      .json({ success: true, response: response, result: result });
  });
};
