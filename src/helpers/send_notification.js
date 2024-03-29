const _ = require("lodash");
const config = require("config");
var FCM = require("fcm-node");
var fcm = new FCM(config.get("serverKey"));
const { Notification } = require("../models/notification");
const { Firebase } = require("../models/firebase");
var send_sms = require("../helpers/send_sms");


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

      // send_sms.sendSms(
      //   "0521479726",
      //   title + " " + cart[key]["title"] + " " + cart[key]["titleEn"]
      // );
    }
  },

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
      // الرسالة دي جاية من الشركة
      // here company
      switch (statusCompany) {
        case 2:
          title = "Order Accepted from company |  تم قبول الطلب من الشركة";
          break;
        case 3:
          title = "Order Rejected from company | تم رفض الطلب من الشركة";
          break;
        case 4:
          title = "Order Executed from company | تم تنفيذ الطلب من الشركة";
          break;
        default:
          break;
      }
    } else {
      // here company Org
      switch (statusOrganizedCompany) {
        case 2:
          title =
            "Order Accepted from Organized Company| تم قبول الطلب من الشركة";
          break;
        case 3:
          title =
            "Order Rejected from Organized Company | تم رفض الطلب من الشركة";
          break;
        case 4:
          title =
            "Order Executed from Organized Company | تم تنفيذ الطلب من الشركة";
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




  sendNotificationBookingOnOrderAvailable: async function (
    req,
    cart,
    userId,
    createdAt,
    statusCompany,
    statusOrganizedCompany
  ) {
    for (const key in cart) {
      console.log("i am in sendNotificationBookingOnOrderAvailable");
      console.log(cart[key]["company"]);

      let user = await Firebase.findOne({ user: cart[key]["company"] });

      let title = "You Have request | لديك طلب ";


      //console.log(user.token);

     var toke = user.token;
      var message = {
        to: toke, // token[0].firebaseToken,
        notification: {
          title: title,
          body: cart[key]["titleEn"] + " | " + cart[key]["title"],
        },

        data: {
          title: title,
          body: req.body,
        },
      };

      fcm.send(message, function (err, response) {
        console.log("In Fcm");
        if (err) console.log(err);


        req.senderId = userId;
        req.receiverId = cart[key]["company"];
        req.title = title;
        req.body = cart[key]["titleEn"] + " | " + cart[key]["title"];
        req.orderId = cart[key]["orderId"];
        req.createdAt = createdAt;
        // req.body.itemId = cart[key]["cart"][];
        req.statusCompany = statusCompany;
        req.statusOrganizedCompany = statusOrganizedCompany;
        const notification = Notification(
          _.pick(req, [
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

        console.log("Done Save notification Fcm");

        notification.save();
      });

      // send_sms.sendSms(
      //   "0521479726",
      //   title + " " + cart[key]["title"] + " " + cart[key]["titleEn"]
      // );
    }
  },


};
