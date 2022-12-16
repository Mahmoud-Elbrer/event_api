const express = require("express");
const router = express.Router();

//Controllers
const CategorySelection = require("../controller/category_selection");

var multer = require("multer");
var upload = multer({
  dest: "public/images/product/",
});

//Routes
router.post("/", upload.single("picture"), CategorySelection.addCategorySelection);
router.get("/", CategorySelection.getCategorySelection);
router.get("/:Id", CategorySelection.getCategorySelectionByProductSelectionId);
router.delete("/:Id", CategorySelection.deleteCategorySelection);
router.patch("/", CategorySelection.updateCategorySelection);

module.exports = router;
