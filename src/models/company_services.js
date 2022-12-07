const mongoose = require("mongoose");

const companyServicesSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    require: true,
  },
});

const CompanyServices = mongoose.model("CompanyServices", companyServicesSchema);

exports.CompanyServices = CompanyServices;
