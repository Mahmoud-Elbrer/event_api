const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");

exports.getBook = async (req, res, next) => {
  let book = await Book.find({ user: req.user._id });

  res.status(200).json(book);
};

exports.addBook = async (req, res, next) => {


console.log("i am ");
console.log(req.body);

 // const { error } = validateAddBook(req.body);
 // if (error) return res.status(400).send(error.details[0].message);

  const createdAt = new Date();

  const book = new Book({
    user: req.body.user,
    totalAmount: req.body.totalAmount,
    cart: req.body.cart,
  });

  const result = await book.save();

  // todo : should send notification to user oder

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteBook = async (req, res, next) => {
  const result = await Book.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
  d;
};
