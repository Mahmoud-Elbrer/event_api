const express = require("express");
const router = express.Router();

//Controllers
const User = require("../controller/user");

//Routes
router.post("/signIn", User.signIn);
router.post("/signUp", User.signUp);
router.post("/sendOtp", User.sendOtp);
router.get("/blockUser", User.blockUser);
router.post("/updateUser", User.updateUserData);

module.exports = router;
