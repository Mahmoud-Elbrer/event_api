const _ = require("lodash");
const { CompanyEmirate } = require("../models/company_emirate");
const { validateAddCompanyEmirate } = require("../validations/validations");
const { log } = require("util");

exports.getCompanyEmirate = async (req, res, next) => {

console.log('log i am here ');
console.log('log i am here ');

  let companyEmirate = await CompanyEmirate.find({
    
  }).populate("company").populate("emirate");


  // console.log(companyEmirate);

  // var newAr = [];
  // for (var attributename in companyEmirate) {
  //   if (
  //     companyEmirate[attributename]["company"]["typeCompany"] ==
  //     req.params.companyType
  //   ) {
  //     newAr = companyEmirate;
  //   }
  // }

  res.status(200).json(companyEmirate);
  // res.status(200).json(companyEmirate);
};

exports.addCompanyEmirate = async (req, res, next) => {



  let sub = await CompanyEmirate.findOne({ company: req.body.company  ,  emirate : req.body.emirate });
  if (sub)
    return res.status(400).json({
      success: false,
      message: "تم الاضافة مسبقا | Already Added",
    });


  const companyEmirate = CompanyEmirate(
    _.pick(req.body, ["company", "emirate"])
  );

  const result = await companyEmirate.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteCompanyEmirate = async (req, res, next) => {
  console.log(req.params.Id);
  const result = await CompanyEmirate.deleteOne({ _id: req.params.Id });

  console.log(result);

  res.status(200).json({
    success: true,
  });
};

// search method
//  exports.searchCompanyEmirate = async (req, res, next) => {
//   let CompanyEmirate = await CompanyEmirate.find({ name: new RegExp(req.params.name, "i") });
//   res.status(200).json(CompanyEmirate);
// };
