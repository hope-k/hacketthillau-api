module.exports = asyncErrorHandler => (res, req, next) => {
    Promise.resolve(asyncErrorHandler(res, req, next)).catch(next)
}