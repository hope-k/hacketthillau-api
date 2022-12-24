const errorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Stat = require('../models/stat');


exports.myStats = asyncErrorHandler(async (req, res, next) => {
    const stats = await Stat.find({ user: req.user._id }).sort({ 'income.year': 1 }).sort({ 'expense.year': 1 })
    if (!stats) {
        next(new errorHandler('Account statistics not found'))
    }
    res.status(200).json({
        stats
    })

})

exports.addStat = asyncErrorHandler(async (req, res, next) => {
    const income = {
        year: req.body.incomeYear,
        amount: req.body.incomeAmount,
    }

    const expense = {
        year: req.body.expenseYear,
        amount: req.body.expenseAmount,
    }

    await Stat.create({
        income: income,
        expense: expense,
        user: req.body.user
    })
    
    res.status(200).json({
        success: true
    })


})



exports.deleteStat = asyncErrorHandler(async (req, res, next) => {
    console.log(req.query.id)
    const stat = await Stat.findById(req.query.id);
    if (!stat) {
        return next(new errorHandler('This ID not not match any of our records'))
    }

    await stat.remove()


    res.status(200).json({
        success: true
    })

});

exports.allStats = asyncErrorHandler(async (req, res, next) => {
    if (req.user?.clientId && req.user.role === 'admin') {
        const stats = await Stat.find({ user: req.user.clientId }).populate('user')
        if (!stats) {
            return next(new errorHandler('No Statistics!'))
        }
        return res.status(200).json({
            stats: stats    
        })
    }
    const stats = await Stat.find().populate('user')
    if (!stats) {
        return next(new errorHandler('No Stats!'))
    }

    res.status(200).json({
        stats
    })

})