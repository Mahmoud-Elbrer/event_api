const Joi = require("joi");

exports.validateSignUp = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string(),
    phone: Joi.string(),
    password: Joi.string().min(3).max(255),
    loginAs : Joi.string().empty('').default(''),
    verifiedUser : Joi.boolean().default(false),
  });
  return schema.validate(user);
};

exports.validateUpdateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string(),
    phone: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    newPassword: Joi.string().min(3).max(255).required(),
    active : Joi.boolean(),
  });
  return schema.validate(user);
};

exports.validateSignUpCompany = function (company) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().min(1).max(255).required().email(),
    //phone: Joi.string(),
    // img: Joi.string().required(),
    password: Joi.string().min(3).max(255).required(),
    typeCompany : Joi.string().required(),
    aboutCompany : Joi.string().min(0),
    aboutCompanyEn : Joi.string().min(0),
    percent : Joi.string().min(0),
   // active : Joi.boolean(),
    // isAdmin : Joi.boolean(),
  });
  return schema.validate(company);
};

exports.validateSignIn = function (user) {
  const schema = Joi.object({
    email: Joi.string(),
    password: Joi.string(),
  });
  return schema.validate(user);
};

exports.validateAddService = function (book) {
  const schema = Joi.object({
    name: Joi.string().required(),
    productType: Joi.string().required(),
    nameEn: Joi.string().required(),
    // img: Joi.string(),
  });
  return schema.validate(book);
};

exports.validateAddEvent = function (event) {
  const schema = Joi.object({
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    // img: Joi.image().required(),
  });
  return schema.validate(event);
};

exports.validateAddCompanyServices = function (event) {
  const schema = Joi.object({
    company: Joi.string().required(),
    service: Joi.string().required(),
    // img: Joi.image().required(),
  });
  return schema.validate(event);
};



exports.validateAddTypeSelectionProduct = function (event) {
  const schema = Joi.object({
    service: Joi.string().required(),
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    // img: Joi.image().required(),
  });
  return schema.validate(event);
};


exports.validateAddCategorySelection = function (event) {
  const schema = Joi.object({
    productSelection: Joi.string().required(),
    name: Joi.string().required(),
    nameEn: Joi.string().required(),
    cost: Joi.string().required(),
    img: Joi.string(),
  });
  return schema.validate(event);
};

exports.validateAddProduct = function (product) {
  const schema = Joi.object({
    //emirate: Joi.string().required(),
    //company: Joi.string().required(),
    //event: Joi.string().required(),
    service: Joi.string().required(),
    productType: Joi.number(),
    productTitle: Joi.string().required(),
    productTitleEn: Joi.string(),
    productDescription : Joi.string().required(),
    productDescriptionEn: Joi.string(),
    services : Joi.array().required(),
    servicesEn: Joi.array(),
    cost: Joi.string(),
    //images: Joi.array(),
    available: Joi.boolean(),
    additionalNotes: Joi.string(),
    additionalNotesEn: Joi.string(),
    numberGuests: Joi.string(),
    //assets: Joi.array(),
    location: Joi.string().required(),
    locationEn: Joi.string().required(),
    longitude: Joi.string().required(),
    Latitude: Joi.string().required(),
  });
  return schema.validate(product);
};

exports.validateAddProductSelection = function (selection) {
  const schema = Joi.object({
    product: Joi.string().required(),
    typeSelectionProduct: Joi.string().required(),
    selectionTitle: Joi.string().required(),
    selectionTitleEn: Joi.string(),
    selectionDescription : Joi.string().required(),
    selectionDescriptionEn: Joi.string(),
    cost: Joi.string(),
  });
  return schema.validate(selection);
};



exports.validateAddRate = function (rate) {
  const schema = Joi.object({
    product: Joi.string(),
    productSelection: Joi.string(),
    rating: Joi.number().required(),
    comment: Joi.number(),
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
    //user: Joi.string().required(),
    product: Joi.string().required(),
    event: Joi.string().required(),
    service: Joi.string().required(),
    //assets: Joi.array().required(),
    date: Joi.string().required(),
    hour: Joi.string().required(),
    cost: Joi.string().required(),
    // createdAt: Joi.string().required(),
    notes: Joi.string(),
    longitude: Joi.string().required(),
    Latitude: Joi.string().required(),
   // status: Joi.number().required(),
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
    // img: Joi.string().required(),
  });
  return schema.validate(emirate);
};

