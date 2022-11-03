
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    require: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    require: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    require: true,
  },
  assets: [
    {
      asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assets",
      },
    },
  ],
  createdAt : {
    type: String,
    require: true,
  } , 
  notes : {
    type: String,
    require: true,
  } , 
  status : {
    type: Number,
    require: true,
  }, 
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;
