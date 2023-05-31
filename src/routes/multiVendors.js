const express = require("express");
const router = express.Router();

//Controllers
const MultiVendors = require("../controller/multiVendors");
const auth = require("../middleware/auth");


//Routes
router.post("/",  [auth] , MultiVendors.createSupplier);
router.post("/uploadSupplierDocument", MultiVendors.uploadSupplierDocument);
router.get("/supplierDashboard/:supplierCode", MultiVendors.getSupplierDashboard);
router.post("/supplierDeposits/:supplierCode", MultiVendors.GetSupplierDeposits);
router.post("/transferBalance/trans",  MultiVendors.transferBalance);
// router.delete("/:Id", Assets.deleteAssets);

module.exports = router;