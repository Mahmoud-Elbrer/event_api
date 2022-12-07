const express = require("express");
const router = express.Router();

//Controllers
const SubscribeService = require("../controller/subscribe_service");

//Routes
router.post("/", SubscribeService.addSubscribeService);
router.get("/:eventId", SubscribeService.getSubscribeService);
router.delete("/:Id", SubscribeService.deleteSubscribeService);

module.exports = router;