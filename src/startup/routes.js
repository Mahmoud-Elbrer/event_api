var userRouter = require("../routes/user");
var companyRouter = require("../routes/company");
var eventRouter = require("../routes/event");
var serviceRouter = require("../routes/service");
var assetsRouter = require("../routes/assets");
var productRouter = require("../routes/product");
var favoriteRouter = require("../routes/favorite");
var bookRouter = require("../routes/book");
var notificationRouter = require("../routes/notification");
var emirateRouter = require("../routes/emirate");
var rateRouter = require("../routes/rate");
var paypalRouter = require("../routes/paypal");
var uploadImageRouter = require("../routes/uploadImage");
// type product
var blackoutDateRouter = require("../routes/blackout_date");
var typeSelectionProductRouter = require("../routes/type_selection_product");
var productSelectionRouter = require("../routes/product_selection");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use("/api/user", userRouter);
  app.use("/api/company", companyRouter);
  app.use("/api/event", eventRouter);
  app.use("/api/service", serviceRouter);
  app.use("/api/assets", assetsRouter);
  app.use("/api/product", productRouter);
  app.use("/api/favorite", favoriteRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/emirate", emirateRouter);
  app.use("/api/rate", rateRouter);
  app.use("/api/paypal", paypalRouter);
  app.use("/api/uploadImage", uploadImageRouter);
  // type product
  app.use("/api/blackoutDate", blackoutDateRouter);
  app.use("/api/typeSelectionProduct", typeSelectionProductRouter);
  app.use("/api/productSelection", productSelectionRouter);
  app.use(error);
};
