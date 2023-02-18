const express = require("express");
const router = express.Router();

//Controllers

const Product = require("../controller/product");
const auth = require("../middleware/auth");

var multer = require("multer");
var upload = multer({
  dest: "public/images/product/",
});


router.post("/" , [ auth ,  upload.single("picture")], Product.addProduct);
router.post("/productDates" , upload.single("picture"), Product.addProductWithDates);
router.get("/:page/:limit", Product.getProduct);
router.get("/:emirateId/:page/:limit", Product.getProductByEmirateId);
router.get("/service/:serviceId", Product.getProductByServiceId);
router.get("/service/:serviceId/productType/:productType", Product.getProductByServiceIdAndProductType);
router.put("/companyService/:serviceId" , [auth], Product.getProductByCompanyAndByServiceId);
router.get("/:productId", Product.getProductById);
router.delete("/:productId", Product.deleteProduct);
//router.post("/visitedProduct/:productId", Product.setVisitedProduct);
router.post("/searchByName/:searchName", Product.searchProduct);
router.put("/updateProduct", Product.updateProduct);
router.delete("/deleteServicesProduct/:productId/:index", Product.deleteServicesProduct);
router.put("/update/updateImageProduct/:productId" , [auth,   upload.single("picture")], Product.updateImgProduct);


module.exports = router ;