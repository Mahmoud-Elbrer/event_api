const express = require("express");
const router = express.Router();

//Controllers
const User = require("../controller/user");
const auth = require("../middleware/auth");

//Routes
router.post("/signIn", User.signIn);
router.post("/signUp", User.signUp);
router.post("/sendOtp",[auth], User.sendOtp);
router.get("/blockUser", User.blockUser);
router.post("/updateUser", User.updateUserData);

module.exports = router;
