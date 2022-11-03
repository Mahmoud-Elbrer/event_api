const express = require("express");
const router = express.Router();

//Controllers
const Service = require("../controller/service");

var multer = require("multer");
var upload = multer({
  dest: "public/images/service",
});

//Routes
router.post("/", upload.single("img"), Service.addService);
router.get("/", Service.getService);
router.delete("/:Id", Service.deleteService);

module.exports = router;
