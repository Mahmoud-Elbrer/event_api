const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 255,
    unique: true,
  },
  phone: {
    type: String,
    // require: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 1024,
  },
  img: {
    type: String,
    // require: true,
  },
  aboutCompany: {
    type: String,
  },
  aboutCompanyEn: {
    type: String,
  },
  typeCompany: {
    type: String,
    // require: true,
  },
  active: Boolean,
  isAdmin: Boolean,
});

// information export principle : oop

companySchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id , name: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "300 days" }
  );
  return token;
};

const Company = mongoose.model("Company", companySchema);

exports.Company = Company;
