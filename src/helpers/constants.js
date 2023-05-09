module.exports = Object.freeze({
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3 , 
    EXECUTED: 4 , 
});


// module.exports = Object.freeze({
//     Paid: 1,
//     NotPaid: 0,
// });

module.exports = Object.freeze({
    DeferredPaymentMethod: 1,
    NotDeferredPaymentMethod: 2,


    Paid: 1,
    NotPaid: 0,


    Cash: 1,
    Online: 2,
});