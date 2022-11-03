const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");

exports.getBook = async (req, res, next) => {
  let book = await Book.find({ user: req.user._id });

  res.status(200).json(book);
};

exports.addBook = async (req, res, next) => {
  const { error } = validateAddBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // todo : should add time
  // let date = new Date();

  let book = await Book(
    _.pick(req.body, [
      "user",
      "product",
      "event",
      "service",
      "assets",
      "createdAt",
      "notes",
      "status",
    ])
  );

  const result = await book.save();

  // todo : should send notification to user oder

  res.status(200).json({
    success: true,
  });
};

exports.deleteBook = async (req, res, next) => {
  const result = await Book.deleteOne({ _id: req.params.Id });

  res.status(200).json({
    success: true,
  });
  d;
};
