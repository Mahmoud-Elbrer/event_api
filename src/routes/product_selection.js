const express = require("express");
const router = express.Router();

//Controllers
const ProductSelection = require("../controller/product_selection");
const auth = require("../middleware/auth");


let fs = require('fs');
let dir = './uploads';
let multer = require("multer") ,  bodyParser = require('body-parser'),
path = require('path');
// var upload = multer({
//   dest: "public/images/product/",
// });

let upload = multer({
  storage: multer.diskStorage({

    destination: (req, file, callback) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './public/images/product/');
    },
    filename: (req, file, callback) => { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: (req, file, callback) => {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});



//Routes
router.post("/",  upload.any(), ProductSelection.addProductSelection);
//router.post("/",  upload.single("picture"), ProductSelection.addProductSelection);
router.get("/", ProductSelection.getProductSelection);
router.get("/product/:Id", ProductSelection.getProductSelectionByProductId);
router.get("/company/:Id", ProductSelection.getProductSelectionByCompany);
router.get("/typeSelection/:productId/:typeSelectionId", ProductSelection.getProductSelectionByTypeSelection);
router.delete("/:Id", ProductSelection.deleteProductSelection);
router.patch("/", ProductSelection.updateProductSelection);
router.put("/update/updateImgProductSelection/:productSelectionId", upload.single("picture"), ProductSelection.updateImgProductSelection);

module.exports = router;
