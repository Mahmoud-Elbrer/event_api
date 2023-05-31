module.exports = Object.freeze({
   Myfatoorah_API_URL : 'https://apitest.myfatoorah.com',
  // status order
  initiate: '/v2/InitiatePayment',
  sendPayment: '/v2/SendPayment',
  execute: '/v2/ExecutePayment',
  paymentStatus: '/v2/getPaymentStatus',
  makeRefund: '/v2/MakeRefund',
  refundStatus: '/v2/getRefundStatus'
});


/*
File Type
1 for Civil Id
2 for Commercial License
3 for Articles of Association
4 for Signature Authorization
5 for Others
6 for Civil Id Back
7 for Instagram
16 for Civil Ids Of All Owners
17 for Civil Id Of Manager
20 for Commercial Register
21 for Bank Account Letter
25 for Website
26 for 3rd Parties
27 for Basic regulations list (For charities only)
28 for Board of Directors Agreement (For charities only)
*/