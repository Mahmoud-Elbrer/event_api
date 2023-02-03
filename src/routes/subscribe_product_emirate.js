const express = require("express");
const router = express.Router();

//Controllers
const SubscribeProductEmirate = require("../controller/subscribe_product_emirate");

//Routes
router.post("/", SubscribeProductEmirate.addSubscribeProductEmirate);
router.get("/:serviceId/:emirateId", SubscribeProductEmirate.getSubscribeProductEmirate);
router.get("/emirateByProduct/productId/:productId", SubscribeProductEmirate.getEmirateByProductId);
router.delete("/:Id", SubscribeProductEmirate.deleteSubscribeProductEmirate);

module.exports = router;