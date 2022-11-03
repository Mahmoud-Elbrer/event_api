const express = require("express");
const router = express.Router();

//Controllers
const Company = require("../controller/company");

//Routes
router.post("/signIn", Company.signIn);
router.post("/signUp", Company.signUp);
router.post("/sendOtp", Company.sendOtp);
router.get("/blockCompany", Company.blockCompany);

module.exports = router;
