const express = require("express");
const router = express.Router();

//Controllers
const Book = require("../controller/book");
const auth = require("../middleware/auth");

//Routes
router.get("/", [auth], Book.getBook);
router.get("/orderCompany/status/:status", [auth], Book.getOrderCompany);
router.get("/organizedCorporateOrder/:status", [auth], Book.getOrganizedCorporateOrder);
router.put("/updateStatusCompany/", [auth], Book.updateStatusCompany);
router.post("/",[auth], Book.addBook);
router.delete("/:Id", [auth], Book.deleteBook);

module.exports = router;
