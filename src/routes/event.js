const express = require("express");
const router = express.Router();

//Controllers
const Event = require("../controller/event");

var multer = require("multer");
var upload = multer({
  dest: "public/images/event/",
});

//Routes
router.post("/", upload.single("picture"), Event.addEvent);
router.get("/", Event.getEvent);
router.delete("/:Id", Event.deleteEvent);
router.patch("/", Event.updateEvent);

module.exports = router;
