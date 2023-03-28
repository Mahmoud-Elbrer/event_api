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
    ref: "Book",
    require: true,
  },
  itemId: {
    type: String,
  },
  createdAt: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  statusCompany: {
    type: Number,
  },
  statusOrganizedCompany: {
    type: Number,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

exports.Notification = Notification;
