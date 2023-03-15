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
    phone: user.phone,
    // verifiedUser: user.verifiedUser,
  });
};

exports.signUp = async (req, res, next) => {
  console.log("sign uo");
  console.log(req.body);
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ phone: req.body.phone });
  if (user)
    return res.status(400).json({
      success: false,
      message: "رقم الهاتف مسجل مسبقا | user already exists",
      user: user,
      token: user.generateAuthToken(), //  i am use this for social media return
    });

  user = User(
    _.pick(req.body, [
      "name",
      "email",
      "phone",
      "password",
      "loginAs",
      "verifiedUser",
    ])
  );

  const salt = await bcrypt.genSalt(10); //  10 it default value
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  console.log(token);

  res.status(200).json({
    success: true,
    token: token,
    user: user,
  });
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
      message:
        "كلمة المرور القديمة غير مطابقة | The old password does not match",
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

  User.updateOne({ _id: user._id }, { $set: newUser })
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
  console.log("i am in send otp");
  var mathRandom = Math.floor(Math.random() * (9999 - 1000) + 1000);
  const passwordCompany = "806807";
  const userCompany = "sadad";
  const message = "Your Event App verification code is : " + mathRandom;
  const phone = req.params.phone;

  const requestHttps = https.request(
    "https://globalsms.edsfze.com:1010/API/SendSMS?username=Edssample&apiId=yomOzOmR&json=True&destination=971" +
      phone.substring(1) +
      "&source=AD-OGLE&text=" +
      message,
    // "https://globalsms.edsfze.com:1010/API//SendSMS?username=Edssample&apiId=GW@FHr~4#8TZ&json=True&destination=971" + req.body.phone + "&source=AD-OGLE&text="  + message,
    (method = "POST"),
    async (responseHttps) => {
      // responseHttps.on("data", (d) => {
      console.log("responseHttps");
      console.log(responseHttps.statusMessage);
      console.log(responseHttps.statusCode);

      if (responseHttps.statusCode == 200) {
        let user = await User.findOne({ phone: phone });
        let now = new Date();
        let result;

        if (user) {
          const newOtp = {
            phone: phone,
            otpCode: mathRandom,
            otpTimesTamp: now,
            otpTries: user.otpTries + 1,
          };

          result = Otp.updateOne({ phone: phone }, { $set: newOtp });
        } else {
          const otp = new Otp({
            phone: phone,
            otpCode: mathRandom,
            otpTimesTamp: now,
            otpTries: 1, // this for first  Tries
          });

          result = otp.save();
        }

        res.status(200).json({
          success: true,
          message: 'تم إرسال الكود | The code has been sent',
        });
      }else {
        res.status(200).json({
          success: false ,
          message: 'فشل في إرسال الكود ، حاول مرة أخرى | Failed to send the code, try again',
        });
      }

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

exports.verifyOtp = async (req, res, next) => {
  let otp = await Otp.findOne({ phone: req.body.phone });
  if (!otp)
    return res.status(400).json({
      success: false,
      message: "الرقم غير مسجل  | Invalid Phone",
    });

  if ((otp.phone = req.body.phone && otp.otpCode == req.body.code)) {
    res.status(200).json({
      success: true,
    });
    // todo : verify user => verifyUser =  true
  } else {
    return res.status(400).json({
      success: false,
      message: "لا يتطابق الكود المرسل | Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
  });
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
