const express = require("express");
const router = express.Router();

//Controllers
const SubscribeProductService = require("../controller/subscribe_product_service");

//Routes
router.post("/", SubscribeProductService.addSubscribeProductService);
router.get("/:productId/:serviceId", SubscribeProductService.getSubscribeProductService);
router.delete("/:Id", SubscribeProductService.deleteSubscribeProductService);

module.exports = router;