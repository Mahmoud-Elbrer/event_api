const _ = require("lodash");
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");

module.exports = {
  sendNotificationUpdatedStatus: async function (
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
    req.body.body = productNameEn + " | " + productName;
    if ((statusOrganizedCompany = 0)) {
      // here company
      switch (statusCompany) {
        case 2:
          title = "Order Accepted | تم قبول الطلب ";
          break;
        case 3:
          title = "Order Rejected | تم رفض الطلب ";
          break;
        case 4:
          title = "Order Executed | تم تنفيذ الطلب ";
          break;
        default:
          break;
      }
    } else {
      // here company Org
      switch (statusOrganizedCompany) {
        case 2:
          title = "Order Accepted | تم قبول الطلب ";
          break;
        case 3:
          title = "Order Rejected | تم رفض الطلب ";
          break;
        case 4:
          title = "Order Executed | تم تنفيذ الطلب ";
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
      // req.body.body = productName;
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
  },
};

module.exports = {
  sendNotificationBooking: async function (
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
  },
};
