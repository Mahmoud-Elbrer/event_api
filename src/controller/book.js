const _ = require("lodash");
const { Book } = require("../models/book");
const { validateAddBook } = require("../validations/validations");
const orderId = require("order-id")("key");

exports.getBook = async (req, res, next) => {
  let book = await Book.find({ user : req.user._id });

  res.status(200).json(book);
};

exports.addBook = async (req, res, next) => {
  // const { error } = validateAddBook(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  const createdAt = year +"-" +month +"-" +date +" " +hours + ":" +minutes +":" +seconds;

  const id = orderId.generate();

  const book = new Book({
    user: req.user._id,
    totalCartAmount: req.body.totalCartAmount,
    organizingCompanyId: req.body.organizingCompanyId,
    organizingCompanyIdAmount: req.body.organizingCompanyIdAmount,
    orderId: orderId.getTime(id),
    createdAt: createdAt,
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
