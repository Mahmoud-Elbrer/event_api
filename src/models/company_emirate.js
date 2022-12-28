const mongoose = require("mongoose");

const companyEmirateSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  emirate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emirate",
    require: true,
  },
});

const CompanyEmirate = mongoose.model("CompanyEmirate", companyEmirateSchema);

exports.CompanyEmirate = CompanyEmirate;
