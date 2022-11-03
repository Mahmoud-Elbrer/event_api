const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { Company } = require("../models/compnay");
const Otp = require("../models/otp");
const { validateSignIn,validateSignUpCompany,} = require("../validations/validations");

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
  const { error } = validateSignUpCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let company = await Company.findOne({ email: req.body.email });
  if (company)
    return res.status(400).json({
      success: false,
      message: "البريد مسجل مسبقا | company already exists",
    });

  company = Company(
    _.pick(req.body, ["name", "email", "password", "phone", "img", "active"  ,"isAdmin"])
  );

  const salt = await bcrypt.genSalt(10); //  10 it default value
  company.password = await bcrypt.hash(company.password, salt);

  await company.save();

  const token = company.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(company, ["_id", "name", "email", "phone", "active"]));
};

exports.sendOtp = async (req, res, next) => {
  var mathRandom = Math.floor(Math.random() * (99999 - 10000) + 10000);
  const passwordCompany = "806807";
  const userCompany = "sadad";
  const message = " كود التحقق " + mathRandom + " تطبيق عقاري  ";
  const phoneNumber = req.body.phoneNumber;
  const requestHttps = https.request(
    "https://sms.nilogy.com/app/gateway/gateway.php?sendmessage=1&username=محمود عبدالله&numbers=" +
      req.body.phoneNumber +
      "&sender=Eyatac",
    (method = "GET"),
    (responseHttps) => {
      responseHttps.on("data", (d) => {
        if (responseHttps.statusMessage === "OK") {
          let now = new Date();
          const newOtp = {
            phoneNumber: phoneNumber,
            otpCode: mathRandom,
            otpTimesTamp: now,
            otpTries: result[0].otpTries + 1,
          };
          let company = Company.findOne({ email: req.body.email });
          let result;
          if (company) {
            result = Otp.updateOne(
              { phoneNumber: req.body.phoneNumber },
              { $set: newOtp }
            );
          } else {
            result = Otp.save();
          }
          res.status(200).json({
            success: true,
            result: result,
          });
        }
      });
    }
  );
  requestHttps.on("error", (error) => {
    res.status(400).json({
      success: false,
      error: error,
    });
  });
  requestHttps.end();
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
