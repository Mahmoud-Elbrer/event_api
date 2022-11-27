const express = require("express");
const router = express.Router();

//Controllers
const Notification = require("../controller/notification");
const auth = require("../middleware/auth");

//Routes
router.get("/", [auth], Notification.getNotification);
router.delete("/", [auth], Notification.deleteNotification);
router.post("/firebaseToken/:token", [auth], Notification.addFireBaseToken);
router.post("/sendNotification/", [auth], Notification.sendNotification);

module.exports = router;
