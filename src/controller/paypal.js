var paypal = require("paypal-rest-sdk");

exports.getPay = async (req, res, next) => {
  var amount = req.body.amount;
  var create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      //return_url: "http://192.168.137.1:3000/api/paypal/successPayment",
      return_url: "https://fair-erin-firefly-belt.cyclic.app/api/paypal/successPayment",
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: amount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: amount,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      //res.status(200).json(payment);
      for (var index = 0; index < payment.links.length; index++) {
        if (payment.links[index].rel === "approval_url") {
          res.redirect(payment.links[index].href);
        }
      }
    }
  });
};

exports.successPayment = async (req, res, next) => {
  var amount = req.body.amount; // req.body.price ;
  var execute_payment_json = {
    payer_id: req.query.PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: amount,
        },
      },
    ],
  };

  var paymentId = req.query.paymentId;

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
      }
    }
  );
};
