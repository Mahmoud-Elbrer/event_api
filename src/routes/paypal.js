const express = require("express");
const router = express.Router();

//Controllers
const Paypal = require("../controller/paypal");
//const auth = require("../middleware/auth");

//Routes
router.post("/pay", Paypal.getPay);
router.post("/successPayment", Paypal.successPayment);

module.exports = router;
