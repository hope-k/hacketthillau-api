const message = require("../models/message");
const errorHandler = require("../utils/errorHandler")


module.exports = (err, req, res, next) => {
    let error;
    const statusCode = err.statusCode || 500

    if (err.message === 'Request Entity Too Large') {
        new errorHandler('Image is too large', 400)
    }
    if (err.name === 'CastError') {
        const message = [`Resource not found, invalid ${err.path}`];
        const statusCode = 404;
        error = new errorHandler(message, statusCode);

        return res.status(statusCode).json({
            success: false,
            error: message
        }) 
    }
    if (err.name === 'ValidationError') {
        //get all validation error messages and put in array 
        const messages = Object.values(err.errors).map(value => value.message);
        error = new errorHandler(messages, 400);
        return res.status(statusCode).json({
            success: false,
            error: messages
        })
    
    }
    const messages = err?.message?.split(',');  
    return res.status(statusCode).json({
        success: false,
        error: messages
    })
}