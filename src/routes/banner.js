const express = require("express");
const router = express.Router();



//Controllers
const Banner = require("../controller/banner");
const auth = require("../middleware/auth");

var multer = require("multer");
var upload = multer({
  dest: "public/images/banner/",
});

//Routes
router.post("/", upload.single("picture"), Banner.addBanner);
router.get("/", Banner.getBanner);
router.delete("/:Id", Banner.deleteBanner);
router.put("/:bannerId", [auth,   upload.single("picture")], Banner.updateImgBanner);

module.exports = router;
