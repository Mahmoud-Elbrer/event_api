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
  typeNotification: {
    type: Number,
    require: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

exports.Notification = Notification;
