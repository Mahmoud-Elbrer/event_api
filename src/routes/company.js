const express = require("express");
const router = express.Router();

//Controllers
const Company = require("../controller/company");

var multer = require("multer");
var upload = multer({
  dest: "public/images/company/",
});


//Routes
router.post("/signIn",Company.signIn);
router.post("/signUp", upload.single("picture"),  Company.signUp);
router.delete("/:Id", Company.deleteCompany);
router.get("/", Company.getCompany);
router.get("/blockCompany", Company.blockCompany);

module.exports = router;
