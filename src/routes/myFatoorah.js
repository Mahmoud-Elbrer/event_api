const express = require("express");
const router = express.Router();

//Controllers
const MyFatoorah = require("../controller/myFatoorah");


//Routes
router.post("/", MyFatoorah.sendPayment);
router.get("/paymentCallBack", MyFatoorah.paymentCallBack);
router.get("/paymentErrorUrlCallBack/error", MyFatoorah.paymentErrorUrlCallBack);
router.get("/paymentStatus/:paymentId", MyFatoorah.paymentStatus);
// router.delete("/:Id", Assets.deleteAssets);

module.exports = router;