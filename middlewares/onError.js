module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        success: false,
        error: {
            message: err.message,
        }
    })
}