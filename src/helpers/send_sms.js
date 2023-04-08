const https = require("https");

module.exports = {
  sendSms: async function (phone , message ) {

    
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
          res.status(200).json({
            success: true,
            message: "The SMS has been sent",
          });
        } else {
          res.status(200).json({
            success: false,
            message: "Failed to send the SMS",
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
  },
};
