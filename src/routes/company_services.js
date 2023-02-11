const express = require('express');
const router = express.Router();

//Controllers
const CompanyServices = require('../controller/company_services');
const auth = require("../middleware/auth");

//Routes
router.post('/',  CompanyServices.addCompanyServices);
router.get('/', [auth] , CompanyServices.getCompanyServices);  
router.get('/:companyId', CompanyServices.getCompanyServicesById);  
router.delete('/:id', CompanyServices.deleteCompanyServices); 


module.exports = router;