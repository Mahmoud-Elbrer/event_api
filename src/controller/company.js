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
  });
};

exports.signUp = async (req, res, next) => {
  console.log('i am');
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

  // company = Company(
  //   _.pick(req.body, ["name", "email", "password", "phone", "img", "active"  ,"isAdmin"])
  // );
  company = new Company({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
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
  let company = await Company.findOne({ email: req.body.email });
  if (!company) return res.status(400).send("Invalid email or password");

  await Company.updateOne(
    { email: req.body.email },
    {
      $set: {
        active: !company.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};
