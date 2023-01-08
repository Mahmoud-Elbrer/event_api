const _ = require("lodash");
const { CompanyServices } = require("../models/company_services");
const { validateAddCompanyServices } = require("../validations/validations");

exports.getCompanyServices = async (req, res, next) => {
  let companyServices = await CompanyServices.find().populate("service");

  res.status(200).json(companyServices);
};

exports.getCompanyServicesById = async (req, res, next) => {
  let companyServices = await CompanyServices.find({ company: req.params.companyId }).populate("service");

  res.status(200).json(companyServices);
};

exports.addCompanyServices = async (req, res, next) => {

  const { error } = validateAddCompanyServices(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  let comp = await CompanyServices.findOne({ service: req.body.service , company: req.body.company   });
  if (comp)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });


  const companyServices = CompanyServices(_.pick(req.body, [ "company" ,"service"]));

  const result = await companyServices.save();

  res.status(200).json({
    success: true,
    companyServices: companyServices,
  });
};

exports.deleteCompanyServices = async (req, res, next) => {
  const result = await CompanyServices.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
  });
};