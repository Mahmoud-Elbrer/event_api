const express = require("express");
const router = express.Router();

//Controllers
const ProductSelection = require("../controller/product_selection");
const auth = require("../middleware/auth");

var multer = require("multer");
var upload = multer({
  dest: "public/images/product/",
});

//Routes
router.post("/",  upload.single("picture"), ProductSelection.addProductSelection);
router.get("/", ProductSelection.getProductSelection);
router.get("/product/:Id", ProductSelection.getProductSelectionByProductId);
router.get("/company/:Id", ProductSelection.getProductSelectionByCompany);
router.get("/typeSelection/:productId/:typeSelectionId", ProductSelection.getProductSelectionByTypeSelection);
router.delete("/:Id", ProductSelection.deleteProductSelection);
router.patch("/", ProductSelection.updateProductSelection);
router.put("/update/updateImgProductSelection/:productSelectionId", upload.single("picture"), ProductSelection.updateImgProductSelection);

module.exports = router;
