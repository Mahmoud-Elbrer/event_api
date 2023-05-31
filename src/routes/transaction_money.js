const express = require("express");
const router = express.Router();

//Controllers
const TransactionMoney = require("../controller/transaction_money");


//Routes
router.post("/payToCompany/:bookId", TransactionMoney.payToCompany);
// router.get("/paymentCallBack", MyFatoorah.paymentCallBack);
// router.get("/paymentErrorUrlCallBack/error", MyFatoorah.paymentErrorUrlCallBack);
// router.get("/paymentStatus/:paymentId", MyFatoorah.paymentStatus);
// router.delete("/:Id", Assets.deleteAssets);

module.exports = router;