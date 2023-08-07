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
router.post("/replace/replaceCompany", [auth], Book.replaceCompany);
router.post("/replace/replaceOrganizedCompany", [auth], Book.replaceOrganizedCompany);
router.post("/available/:Id", [auth], Book.makeOrderAvailable);
router.post("/",[auth], Book.addBook);
router.get("/searchOrderCompany/code/:code", [auth], Book.searchOrderCompany);
router.delete("/:Id", [auth], Book.deleteBook);

module.exports = router;
