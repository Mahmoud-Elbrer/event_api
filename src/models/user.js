const config = require("config");
const { bool, boolean } = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    // index: true,
    // unique: true,
  //   require: false,
  //  // unique: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    minLength: 3,
    maxLength: 1024,
  },
  loginAs: {
    type: String,
  }, 
  verifiedUser : {
    type: Boolean,
  },
});

// information export principle : oop

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name },
    config.get("jwtPrivateKey"),
    { expiresIn: "300 days" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
