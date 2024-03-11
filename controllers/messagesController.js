const errorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Message = require('../models/message');


exports.messages = asyncErrorHandler(async (req, res, next) => {
    const userMessages = await Message.find({ user: req.user._id }).sort({ createdAt: 1 });
    const systemMessages = await Message.find().sort({ createdAt: 1 });

    //sort for only system message a filter out other users messages
    const finalSystemMessages = systemMessages.filter(message => !message.user)


    if (!systemMessages && !userMessages) {
        return next(new errorHandler('No new message'))
    }
    const messages = userMessages.concat(finalSystemMessages).sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)




    res.status(200).json({
        messages: messages

    })
}
)

exports.addMessage = asyncErrorHandler(async (req, res, next) => {
    console.log('========>>', req.user.role)
    if((req.body.user !== req.user.clientId) || req.user.role !== 'super-admin'){
        return next(new errorHandler('You are not authorized to send message to this user'))
    }

    await Message.create({
        title: req.body.title,
        text: req.body.text,
        user: req.body?.user || null
    })




    res.status(200).json({
        success: true
    })


})
exports.updateMessage = asyncErrorHandler(async (req, res, next) => {
    const { id, field, value } = req.body
    const message = await Message.findById(id);
    if (!message) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    message[field] = value
    message.save()
    res.status(200).json({
        success: true
    })

})
exports.deleteMessage = asyncErrorHandler(async (req, res, next) => {
    const message = await Message.findById(req.query.id);
    if (!message) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    await message.remove();
    res.status(200).json({
        success: true
    })
})

exports.allMessages = asyncErrorHandler(async (req, res, next) => {
    if (req.user?.clientId && req.user.role === 'admin') {
        const messages = await Message.find({ user: req.user.clientId }).populate('user')
        if (!messages) {
            return next(new errorHandler('No Messages!'))
        }
        return res.status(200).json({
            messages,
            success: true
        })
    }
    const messages = await Message.find().populate('user');


    if (!messages) {
        return next(new errorHandler('No Messages!'))
    }

    res.status(200).json({
        success: true,
        messages
    })

})