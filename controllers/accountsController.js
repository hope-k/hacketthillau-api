const errorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Account = require('../models/account');
const crypto = require('crypto');


exports.myAccounts = asyncErrorHandler(async (req, res, next) => {
    const accounts = await Account.find({ user: req.user._id });
    if (!accounts) {
        next(new errorHandler('Open an account'))
    }

    res.status(200).json({
        accounts
    })
}
)


exports.addAccount = asyncErrorHandler(async (req, res, next) => {
    const accountNumber = crypto.randomBytes(10).readInt32BE(0)
    await Account.create({
        accountNumber: accountNumber,
        accountType: req.body.accountType,
        balance: req.body.balance,
        user: req.body.user

    });

    res.status(200).json({
        success: true
    })

})


exports.updateAccount = asyncErrorHandler(async (req, res, next) => {
    const account = await Account.findById(req.body.id);
    if (!account) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    account[req.body.field] = req.body.value;
    await account.save();

    res.status(200).json({
        success: true
    })

})
exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {
    const account = await Account.findById(req.query.id);
    if (!account) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    await account.remove()


    res.status(200).json({
        success: true
    })
})

exports.allAccounts = asyncErrorHandler(async (req, res, next) => {
    if (req.user?.clientId && req.user.role === 'admin') {
        const accounts = await Account.find({ user: req.user.clientId }).populate('user')
        if (!accounts) {
            return next(new errorHandler('No Accounts!'))
        }
        return res.status(200).json({
            accounts,
            success: true
        })
    }

    const accounts = await Account.find().populate('user')
    if (!accounts) {
        return next(new errorHandler('No accounts!'))
    }

    res.status(200).json({
        success: true,
        accounts
    })

})


