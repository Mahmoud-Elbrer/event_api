// module.exports = Object.freeze({
//     PENDING: 1,
//     ACCEPTED: 2,
//     REJECTED: 3 , 
//     EXECUTED: 4 , 
// });


// module.exports = Object.freeze({
//     Paid: 1,
//     NotPaid: 0,
// });

module.exports = Object.freeze({
   // status order
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3 , 
    EXECUTED: 4 , 
    PAID_PAYMENT: 5 , 


 //  type payment method
    DeferredPaymentMethod: 1,
    NotDeferredPaymentMethod: 2,

// type payment
    Paid: 1,
    NotPaid: 0,

// 
    Cash: 1,
    Online: 2,
});