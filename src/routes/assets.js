const express = require("express");
const router = express.Router();

//Controllers
const Assets = require("../controller/assets");

var multer = require("multer");
var upload = multer({
  dest: "public/images/assets",
});

//Routes
router.post("/", upload.single("img"), Assets.addAssets);
router.get("/", Assets.getAssets);
router.delete("/:Id", Assets.deleteAssets);

module.exports = router;
