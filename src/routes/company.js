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
router.get("/companyById/:Id", Company.getCompanyById);
router.get("/companyType/:typeCompany", Company.getCompanyByType);
router.put("/blockCompany/:Id", Company.blockCompany);
router.patch("/", Company.updateCompany);

module.exports = router;
