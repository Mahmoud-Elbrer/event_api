const express = require("express");
const router = express.Router();

//Controllers
const Book = require("../controller/book");
const auth = require("../middleware/auth");

//Routes
router.get("/", [auth], Book.getBook);
router.get("/orderCompany/", [auth], Book.getOrderCompany);
router.get("/organizedCorporateOrder/", [auth], Book.getOrganizedCorporateOrder);
router.post("/",[auth], Book.addBook);
router.delete("/:Id", [auth], Book.deleteBook);

module.exports = router;
