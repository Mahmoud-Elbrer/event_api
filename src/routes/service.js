const express = require("express");
const router = express.Router();

//Controllers
const Service = require("../controller/service");
const auth = require("../middleware/auth");

var multer = require("multer");
var upload = multer({
  dest: "public/images/service/",
});

//Routes
router.post("/", upload.single("picture"), Service.addService);
router.get("/", Service.getService);
router.get("/:Id", Service.getServiceByEventId);
router.delete("/:Id", Service.deleteService);
router.patch("/", Service.updateService);
router.put("/updateImgService/:serviceId", [auth, upload.single("picture")] , Service.updateImgService);

module.exports = router;
