const express = require("express");
const router = express.Router();

//Controllers
const ProductSelection = require("../controller/product_selection");

var multer = require("multer");
var upload = multer({
  dest: "public/images/selection/",
});

//Routes
router.post("/", upload.single("picture"), ProductSelection.addProductSelection);
router.get("/", ProductSelection.getProductSelection);
router.get("/service/:Id", ProductSelection.getProductSelectionByServiceId);
router.delete("/:Id", ProductSelection.deleteProductSelection);

module.exports = router;
