const errorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Transaction = require('../models/transaction');
const Account = require('../models/account');


exports.myTransactions = asyncErrorHandler(async (req, res, next) => {

    const transactions = await Transaction.find({ user: req.user._id }).populate({ path: 'accountId' }).sort({ createdAt: -1 })

    if (!transactions) {
        return next(errorHandler('No Recent Transactions'))
    }

    await transactions.forEach(asyncErrorHandler(async (transaction) => {

        const account = await Account.findById(transaction.accountId);

        if (transaction.transactionType === 'transfer' && transaction.status === 'sent') {
            if (transaction.status = 'failed') {
                account.balance = account.balance
            }
            account.balance -= transaction.amount;
            transaction.status = 'complete'
            await account.save();
        }


        if (transaction.transactionType === 'deposit' && transaction.status === 'sent') {
            account.balance += transaction.amount;
            transaction.status = 'complete'
            await account.save();
        }
        await transaction.save();
    }));

    res.status(200).json({
        transactions
    })

});

exports.addTransaction = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.payeeAccountNumber) {
        return next(new errorHandler('Account Number Is Required'))

    }
    if (!req.body.payeeRoutingNumber) {
        return next(new errorHandler('Routing Number Is Required'))
    }

    if (req.body.payeeAccountNumber !== req.body.confirmAccountNumber) {
        return next(new errorHandler('Account Numbers does not match'))
    }
    const account = await Account.findById(req.body.accountId);
    const transaction = await Transaction.create({
        payeeAccountNumber: req.body.payeeAccountNumber,
        payeeRoutingNumber: req.body.payeeRoutingNumber,
        amount: req.body.amount,
        accountId: req.body.accountId,
        memo: req.body?.memo,
        user: req.body?.user || req.user._id
    });
    const transactionRetrieve = await Transaction.findById(transaction._id);
    if (transactionRetrieve.transactionType === 'transfer' && transactionRetrieve.amount > account.balance) {
        transactionRetrieve.status = 'failed'
        await transactionRetrieve.save()
        return next(new errorHandler('This transaction cannot be processed due to insufficient funds'));
    }


    return res.status(200).json({
        success: true
    })

});

exports.updateTransaction = asyncErrorHandler(async (req, res, next) => {
    const { id, field, value } = req.body
    const transaction = await Transaction.findById(id);



    if (!transaction) {
        return next(new errorHandler('This ID not not match any of our records'))
    }

    transaction[field] = value
    await transaction.save()

    return res.status(200).json({
        success: true
    })
});


exports.deleteTransaction = asyncErrorHandler(async (req, res, next) => {
    const transaction = await Transaction.findById(req.query.id);
    if (!transaction) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    await transaction.remove()
    return res.status(200).json({
        success: true
    })
});
exports.allTransactions = asyncErrorHandler(async (req, res, next) => {
    const transactions = await Transaction.find().populate({ path: 'accountId user' }).sort({ createdAt: -1 })

    if (!transactions) {
        return next(new errorHandler('No Transactions!'))
    }
  
    return res.status(200).json({
        transactions: transactions,
    })

});
exports.adminDeposit = asyncErrorHandler(async (req, res, next) => {
    await Transaction.create({
        accountId: req.body.accountId,
        amount: req.body.amount,
        transactionType: req.body.transactionType,
        user: req.body.user,
        status: req.body.status
    })



    return res.status(200).json({
        success: true,
    })




});