const bcrypt = require("bcrypt");
const _ = require("lodash");
const https = require("https");
const { User } = require("../models/user");
const Otp = require("../models/otp");
const {
  validateSignIn,
  validateSignUp,
  validateUpdateUser,
} = require("../validations/validations");

exports.signIn = async (req, res, next) => {

  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      success: false,
      message:
        "خطأ في البريد الالكتروني او كلمة المرور | Invalid email or password",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message:
        "خطأ في البريد الالكتروني او كلمة المرور | Invalid email or password",
    });

  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token,
    name: user.name,
    email: user.email,
  });
};

exports.signUp = async (req, res, next) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({
      success: false,
      message: "خطأ في البريد الالكتروني او كلمة المرور | user already exists",
      user: user,
      token: user.generateAuthToken(), //  i am use this for social media return 
    });

  user = User(
    _.pick(req.body, ["name", "email", "phone", "password", "active" ,"loginAs"])
  );

  const salt = await bcrypt.genSalt(10); //  10 it default value
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.status(200).json({
    success: true,
    token: token,
    user: user,
  });

  // res
  //   .header("x-auth-token", token)
  //   .send(_.pick(user, ["_id", "name", "email" ,"phone"]));
};

exports.updateUserData = async (req, res, next) => {
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      success: false,
      message: "الحساب غير موجود | user not exists",
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message: "كلمة المرور القديمة غير مطابقة | The old password does not match",
    });

  //  userUpdated = User(
  //   _.pick(req.body, ["name", "email", "phone", "password", "active"])
  // );





  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.newPassword, salt);


  const newUser = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: user.password,
  };

  User.updateOne({ _id: user._id  }, { $set: newUser })
  .then((result) => {
    console.log("Re result");
    console.log(result);
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
    console.log("err");
    console.log(err);
    res.status(404).json({
      message: "Error Connection  " + err,
      success: false,
    });
  });

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
          let user = User.findOne({ email: req.body.email });
          let result;
          if (user) {
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

exports.blockUser = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  await User.updateOne(
    { email: req.body.email },
    {
      $set: {
        active: !user.active,
      },
    }
  );

  res.status(200).json({
    success: true,
  });
};
