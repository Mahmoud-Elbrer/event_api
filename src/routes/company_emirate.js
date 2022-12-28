const express = require("express");
const router = express.Router();

//Controllers
const CompanyEmirate = require("../controller/company_emirate");

//Routes
router.post("/", CompanyEmirate.addCompanyEmirate);
router.get("/:emirateId", CompanyEmirate.getCompanyEmirate);
router.delete("/:Id", CompanyEmirate.deleteCompanyEmirate);

module.exports = router;