const express = require("express");
const router = express.Router();

//Controllers
const BlackoutDate = require("../controller/blackout_date");

//Routes
router.post("/",BlackoutDate.addBlackoutDate);
router.get("/:Id", BlackoutDate.getBlackoutDate);
router.delete("/:Id", BlackoutDate.deleteBlackoutDate);

module.exports = router;
