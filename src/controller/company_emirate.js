const _ = require("lodash");
const { CompanyEmirate } = require("../models/company_emirate");
const { validateAddCompanyEmirate } = require("../validations/validations");

exports.getCompanyEmirate = async (req, res, next) => {  


console.log(req.params.emirateId);

  let companyEmirate = await CompanyEmirate.find({ emirate: req.params.emirateId  })
    .populate("company")
    .populate("emirate");

    console.log(companyEmirate);

    var newAr = []; 
    for(var attributename in companyEmirate){
      // console.log(attributename+": "+companyEmirate[attributename]['company']['email']);
      if(companyEmirate[attributename]['company']['typeCompany'] == req.params.companyType) {
         newAr = companyEmirate ; 
      }

  }

  console.log(newAr);
  res.status(200).json(newAr);
 // res.status(200).json(companyEmirate);
};



exports.addCompanyEmirate = async (req, res, next) => {
  const companyEmirate = CompanyEmirate(_.pick(req.body, [ "company" ,"emirate"]));

  const result = await companyEmirate.save();

  res.status(200).json({
    success: true,
    result: result,
  });
};

exports.deleteCompanyEmirate = async (req, res, next) => {
  console.log(req.params.Id );
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
