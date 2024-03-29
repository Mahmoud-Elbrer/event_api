const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { Company } = require("../models/compnay");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUpCompany,
} = require("../validations/validations");
var fs = require("fs");

exports.signIn = async (req, res, next) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = await Company.findOne({ email: req.body.email });
  if (!company)
    return res.status(400).json({
      success: false,
      message:
        "خطأ في البريد الالكتروني او كلمة المرور | Invalid email or password",
    });

  if (!company.active || company.active == false)
    return res.status(400).json({
      success: false,
      message: "لم يتم تفعيل حسابك بعد | Your account has not been activated",
    });

  const validPassword = await bcrypt.compare(
    req.body.password,
    company.password
  );
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message:
        "خطأ في البريد الالكتروني او كلمة المرور | Invalid email or password",
    });

  const token = company.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token,
    company: company,
  });
};

exports.signUp = async (req, res, next) => {
  console.log("i am");
  console.log(req.body);
  const { error } = validateSignUpCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = await Company.findOne({ email: req.body.email });
  if (company)
    return res.status(400).json({
      success: false,
      message: "البريد مسجل مسبقا | company already exists",
    });

  var src = fs.createReadStream(req.file.path);
  var dest = fs.createWriteStream(
    "public/images/company/" + req.file.originalname
  );
  src.pipe(dest);
  src.on("end", function () {
    fs.unlinkSync(req.file.path);
    //res.json("OK: received " + req.file.originalname);
  });
  src.on("error", function (err) {
    res.json("Something went wrong!");
  });

  company = new Company({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    aboutCompany: req.body.aboutCompany,
    aboutCompanyEn: req.body.aboutCompanyEn,
    typeCompany: req.body.typeCompany,
    percent: req.body.percent,
    // isAdmin: req.body.isAdmin,
    // active: req.body.active,
    img: req.file.originalname,
  });

  const salt = await bcrypt.genSalt(10); //  10 it default value
  company.password = await bcrypt.hash(company.password, salt);

  await company.save();

  const token = company.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(company, ["_id", "name", "email", "phone", "active"]));
};

exports.getCompany = async (req, res, next) => {
  let company = await Company.find();
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(company);
};

exports.getCompanyById = async (req, res, next) => {
  let company = await Company.findOne({ _id: req.params.Id });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(company);
};

exports.getCompanyByType = async (req, res, next) => {
  console.log("getCompanyByType");
  //let company = await Company.find({ typeCompany: req.params.typeCompany  , typeCompany: 1 });
if(req.params.typeCompany ==  1){
  req.params.typeCompany = 2 ; 
}

  let company = await Company.find({
    $or: [{ typeCompany: req.params.typeCompany}],
  });
  // if (!user) return res.status(400).send("Invalid email or password");

  res.status(200).json(company);
};

exports.deleteCompany = async (req, res, next) => {
  const companyResult = await Company.findOne({ _id: req.params.Id });

  const DIR = "public/images/company/" + companyResult.img;

  if (!DIR) {
    await Company.deleteOne({ _id: req.params.Id });
  } else {
    try {
      fs.unlinkSync(DIR);
      await Company.deleteOne({ _id: req.params.Id });
    } catch (error) {
      await Company.deleteOne({ _id: req.params.Id });
    }
  }

  res.status(200).json({
    success: true,
  });
};

exports.blockCompany = async (req, res, next) => {
  let company = await Company.findOne({ _id: req.params.Id });
  if (!company)
    return res.status(400).send("Company not found |  الشركة غير موجودة");

  await Company.updateOne(
    { _id: req.params.Id },
    {
      $set: {
        active: !company.active,
      },
    }
  );

  res.status(200).json({
    success: true,
    active: !company.active,
  });
};

exports.updateCompany = async (req, res, next) => {
  const newCompany = {
    name: req.body.name,
    email: req.body.email,
  };

  Company.updateOne({ _id: req.body.companyId }, { $set: newCompany })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "تم التحديث بنجاح | Update completed successfully",
          success: true,
        });
      } else {
        res.status(200).json({
          message: "الحساب غير موجود | user not exists",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error Connection  " + err,
        success: false,
      });
    });
};
