const asyncErrorHandler = require("../utils/asyncErrorHandler")
const errorHandler = require("../utils/errorHandler")


module.exports = asyncErrorHandler(async (req, res, next) => {
    if (req?.user?.role !== 'super-admin') {
        return next(new errorHandler(`Role ${req?.user?.role} not authorized`, 403));
    }
    return next()
})
