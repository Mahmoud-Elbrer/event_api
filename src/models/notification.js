const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  titleEn: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  typeNotification: {
    type: Number,
    require: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

exports.Notification = Notification;
