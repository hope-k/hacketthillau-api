const errorHandler = require("../utils/errorHandler")


module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    // if error is from cloudinary entity too large error
    if (err.message === 'Request Entity Too Large') {
        new errorHandler('Image is too large', 400)
    }
    return res.status(statusCode).json({
        success: false,
        error: {
            message: err.message,
        }
    })
}