const express = require("express");
const router = express.Router();
const UploadImage = require("../controller/uploadImage");

var multer = require("multer");
var upload = multer({
  dest: "public/images/event",
});

//Routes
router.post("/upload", upload.single("picture") , UploadImage.uploadImage);
//router.post("/uploadMultiImage", upload.array("picture" , 10) , UploadImage.uploadImage);

module.exports = router;
