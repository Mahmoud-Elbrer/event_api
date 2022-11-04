const express = require("express");
const router = express.Router();
//var upload = multer({ dest: "uploads/" });

var multer = require("multer");
var upload = multer({
  dest: "public/images/event/",
});

//Controllers
const UploadImage = require("../controller/uploadImage");

//Routes
router.post("/upload", upload.single("picture") , UploadImage.uploadImage);
//router.post("/uploadMultiImage", upload.array("picture" , 10) , UploadImage.uploadImage);

module.exports = router;
