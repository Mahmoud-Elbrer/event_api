const express = require("express");
const router = express.Router();

//Controllers
const Installment = require("../controller/installment");
const auth = require("../middleware/auth");

//Routes
router.post("/:Id", [auth], Installment.addInstallment);
router.get("/", [auth], Installment.getInstallment);
router.get("/:Id", [auth], Installment.getInstallmentByOrderId);
router.put("/", [auth], Installment.updateInstallment);

module.exports = router;
