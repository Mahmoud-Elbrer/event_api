const express = require("express");
const router = express.Router();

//Controllers
const ProductSelection = require("../controller/product_selection");

var multer = require("multer");
var upload = multer({
  dest: "public/images/product/",
});

//Routes
router.post("/", upload.single("picture"), ProductSelection.addProductSelection);
router.get("/", ProductSelection.getProductSelection);
router.get("/product/:Id", ProductSelection.getProductSelectionByProductId);
router.get("/company/:Id", ProductSelection.getProductSelectionByCompany);
router.delete("/:Id", ProductSelection.deleteProductSelection);

module.exports = router;
