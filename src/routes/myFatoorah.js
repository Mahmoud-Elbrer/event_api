const express = require("express");
const router = express.Router();

//Controllers
const MyFatoorah = require("../controller/myFatoorah");
const auth = require("../middleware/auth");


//Routes
router.post("/", [auth] , MyFatoorah.sendPayment);
router.get("/paymentCallBack/success/:resultId/:user", MyFatoorah.paymentCallBack);
router.get("/paymentErrorUrlCallBack/error/:resultId", MyFatoorah.paymentErrorUrlCallBack);
router.get("/paymentStatus/:paymentId", MyFatoorah.paymentStatus);
// router.delete("/:Id", Assets.deleteAssets);

module.exports = router;