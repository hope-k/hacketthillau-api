const User = require("../models/user")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const errorHandler = require("../utils/errorHandler")
const jwt = require('jsonwebtoken')

module.exports = asyncErrorHandler(async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return next(new errorHandler('Login to gain access', 403));
    }
    const decode = jwt.verify(token, 'secret');

    const user = await User.findOne({ _id: decode._id })

    if (!user) {
        return next(new errorHandler('Login to gain access'))
    }
    req.user = user
    return next()
})