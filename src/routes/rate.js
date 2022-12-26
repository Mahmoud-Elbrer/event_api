const express = require("express");
const router = express.Router();

//Controllers
const Rate = require("../controller/rate");
const auth = require("../middleware/auth");

//Routes
router.post("/", [auth], Rate.addRate);
router.get("/", [auth], Rate.getRate);
router.delete("/:Id", [auth], Rate.deleteRate);
router.get("/reviewProductRate/:productId" , Rate.reviewProduct);
router.get("/reviewSelectionProductRate/:productSelectionId" , Rate.reviewSelectionProduct);

module.exports = router;
