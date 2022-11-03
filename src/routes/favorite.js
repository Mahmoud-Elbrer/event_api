const express = require("express");
const router = express.Router();

//Controllers
const Favorite = require("../controller/favorite");
const auth = require("../middleware/auth");

//Routes
router.post("/:Id", [auth], Favorite.addFavorite);
router.get("/", [auth], Favorite.getFavorite);
router.delete("/:Id", [auth], Favorite.deleteFavorite);

module.exports = router;
