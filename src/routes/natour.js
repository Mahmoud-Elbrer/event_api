const express = require("express");
const router = express.Router();

//Controllers
const Natour = require("../controller/natour");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], Natour.addNatour);
router.get("/", [auth], Natour.getNatour);

module.exports = router;
