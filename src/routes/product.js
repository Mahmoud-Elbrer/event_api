const express = require("express");
const router = express.Router();
const multer = require("multer");

//Controllers

const Product = require("../controller/product");


router.post("/" , Product.addProduct);
router.get("/:page/:limit", Product.getProduct);
router.get("/:emirateId/:page/:limit", Product.getProductByEmirateId);
router.get("/:productId", Product.getProductById);
router.delete("/:productId", Product.deleteProduct);
//router.post("/visitedProduct/:productId", Product.setVisitedProduct);
router.copy("/searchByName/:searchName", Product.searchProduct);


module.exports = router;