const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    //require: true,
  },
  paymentMethode: {
    type: String,
    require: true,
  },
  paymentId: {
    type: String,
    require: true,
  },
  totalCartAmount: {
    type: String,
    require: true,
  },
  organizingCompanyId: {
    type: String,
  },
  organizingCompanyIdAmount: {
    type: String,
  },
  orderId: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },

  cart: [
    {
      productId: {
        type: String,
        require: true,
      },
      company: {
        type: String,
        require: true,
      },
      title: {
        type: String,
        require: true,
      },
      titleEn: {
        type: String,
        require: true,
      },
      price: {
        type: String,
        require: true,
      },
      note: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        require: true,
      },

      time: {
        type: String,
        require: true,
      },
      date: {
        type: String,
        require: true,
      },
      typeProduct: {
        type: String,
        require: true,
      },
      selectionId: {
        type: String,
      },
      latitude: {
        type: String,
        require: true,
      },
      longitude: {
        type: String,
        require: true,
      },
      quantity: {
        type: String,
        require: true,
      },
      numHour: {
        type: Number,
      },
      numDay: {
        type: Number,
      },
      titleTextCard: {
        type: String,
        require: true,
      },
      bodyTextCard: {
        type: String,
        require: true,
      },
      senderNameTextCard: {
        type: String,
        require: true,
      },
      categories: {
        type: String,
        require: true,
      },
      categoriesEn: {
        type: String,
        require: true,
      },
      categoriesCost: {
        type: String,
        require: true,
      },
      dressColor: {
        type: String,
        require: true,
      },
      dressMeasurement: {
        type: String,
        require: true,
      },
      choices: {
        type: String,
        require: true,
      },
      choicesEn: {
        type: String,
        require: true,
      },
      weight: {
        type: String,
      },
      status: {
        type: Number,
      },
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;

/*

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //require: true,
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
  // assets: [
  //   {
  //     asset: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Assets",
  //     },
  //   },
  // ],
  date : {
    type: String,
    require: true,
  } , 
  hour : {
    type: String,
    require: true,
  } , 
  createdAt : {
    type: String,
    //require: true,
  } , 
  notes : {
    type: String,
  } , 
  longitude : {
    type: String,
    require: true,
  } , 
  Latitude : {
    type: String,
    require: true,
  } , 
  status : {
    type: Number,
  }, 
});

const Book = mongoose.model("Book", bookSchema);

exports.Book = Book;

*/
