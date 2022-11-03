const express = require("express");
const router = express.Router();

//Controllers
const Event = require("../controller/event");

var multer = require("multer");
var upload = multer({
  dest: "public/images/event",
});

//Routes
router.post("/", upload.single("img"), Event.addEvent);
router.get("/", Event.getEvent);
router.delete("/:Id", Event.deleteEvent);

module.exports = router;
