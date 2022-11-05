const express = require("express");
const router = express.Router();

//Controllers
const Service = require("../controller/service");

var multer = require("multer");
var upload = multer({
  dest: "public/images/service/one",
});

//Routes
router.post("/", upload.single("picture"), Service.addService);
router.get("/", Service.getService);
router.get("/:Id", Service.getServiceByEventId);
router.delete("/:Id", Service.deleteService);

module.exports = router;
