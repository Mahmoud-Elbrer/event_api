const Joi = require("joi");

exports.validateSignUp = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string(),
    phone: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    active : Joi.boolean(),
  });
  return schema.validate(user);
};

exports.validateSignUpCompany = function (company) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    img: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    active : Joi.boolean(),
    isAdmin : Joi.boolean(),
  });
  return schema.validate(company);
};

exports.validateSignIn = function (user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255),
    password: Joi.string().min(3).max(255),
  });
  return schema.validate(user);
};

exports.validateAddService = function (book) {
  const schema = Joi.object({
    event: Joi.string().required(),
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    img: Joi.string(),
  });
  return schema.validate(book);
};

exports.validateAddEvent = function (event) {
  const schema = Joi.object({
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    img: Joi.string(),
  });
  return schema.validate(event);
};


exports.validateAddProduct = function (product) {
  const schema = Joi.object({
    emirate: Joi.string().required(),
    company: Joi.string().required(),
    event: Joi.string().required(),
    service: Joi.string().required(),
    productType: Joi.number().required(),
    productTitle: Joi.string().required(),
    productTitleEn: Joi.string(),
    productDescription : Joi.string().required(),
    productDescriptionEn: Joi.string(),
    cost: Joi.string(),
    images: Joi.array(),
    available: Joi.boolean(),
    additionalNotes: Joi.string(),
    additionalNotesEn: Joi.string(),
    assets: Joi.array(),
    location: Joi.string().required(),
    locationEn: Joi.string().required(),
    longitude: Joi.string().required(),
    Latitude: Joi.string().required(),
  });
  return schema.validate(product);
};


exports.validateAddRate = function (rate) {
  const schema = Joi.object({
    user: Joi.string().required(),
    product: Joi.string().required(),
    numRate: Joi.number().required(),
  });
  return schema.validate(rate);
};


exports.validateAddFavorite  = function (favorite) {
  const schema = Joi.object({
    user: Joi.string().required(),
    product: Joi.string().required(),
  });
  return schema.validate(favorite);
};


exports.validateAddBook  = function (book) {
  const schema = Joi.object({
    user: Joi.string().required(),
    product: Joi.string().required(),
    event: Joi.string().required(),
    service: Joi.string().required(),
    assets: Joi.array().required(),
    createdAt: Joi.string().required(),
    notes: Joi.string().required(),
    status: Joi.number().required(),
  });
  return schema.validate(book);
};

exports.validateAddNotification  = function (notification) {
  const schema = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    typeNotification: Joi.string().required(),
  });
  return schema.validate(notification);
};


exports.validateAddFireBaseToken  = function (notification) {
  const schema = Joi.object({
    user: Joi.string().required(),
    firebaseToken: Joi.string().required(),
  });
  return schema.validate(notification);
};

exports.validateAddEmirate  = function (emirate) {
  const schema = Joi.object({
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
  });
  return schema.validate(emirate);
};

exports.validateAddAssets  = function (emirate) {
  const schema = Joi.object({
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    img: Joi.string().required(),
  });
  return schema.validate(emirate);
};

