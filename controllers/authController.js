const errorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const connection = require("../config/connectDb");
const User = require('../models/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcryptjs')
//restore

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.allUsers = asyncErrorHandler(async (req, res, next) => {
    if (req.user?.clientId && req.user.role === 'admin') {
        const adminClient = []
        const user = await User.findById(req.user.clientId)
        adminClient.push(user)
        return res.status(200).json({
            users: adminClient
        })
    }
    const users = await User.find().sort({ createdAt: -1 })
    if (!users) {
        return next(new errorHandler('No Users'))
    }

    res.status(200).json({
        users
    })
})

exports.register = asyncErrorHandler(async (req, res, next) => {
    const session = await connection.startSession();
    session.startTransaction();
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        return next(new errorHandler('Try a different User ID '))
    }
    let image = {};
    if(req.body.image){
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: 'hacketthill/users',
            width: 150,
            crop: "scale",     
        })
        image.url = result.secure_url
        image.public_id = result.public_id

    }
    const newUser = await User.create([
        {
            ...req.body,
            image
        }
    ], { session });
    
    const clientId = newUser[0]._id;
    const adminUsername = `${newUser[0].username}admin`;
    const adminPassword = `${req.body.password}admin`;


    await User.create([{
        clientId: clientId,
        username: adminUsername,
        password: adminPassword,
        email: req.body.email,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        dateOfBirth: '01/01/2000',
        phone: '1234567890', ssn: '123456789',
        address: '123 Main St'
    }], { session });
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({
        success: true,
    })

});

exports.login = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username }).select('+password')
    console.log(user, '---')

    if (!user) {
        return next(new errorHandler('Incorrect user ID or password', 401))
    }
    const passwordMatch = await user.comparePasswords(req.body.password);

    if (!passwordMatch) {
        return next(new errorHandler('Incorrect user ID or password'))
    }
    if (user.status === 'inactive') {
        return next(new errorHandler('Your account is still being processed'))
    }
    const token = await user.generateAuthToken()
    const finalUser = await User.findOne({ username: req.body.username })





    return res.status(200).json({
        success: true,
        user: finalUser,
        isAuthenticated: true,
        token

    })
})

exports.logout = asyncErrorHandler(async (req, res, next) => {
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
    })
})

exports.updateUser = asyncErrorHandler(async (req, res, next) => {
    const { id, field, value } = req.body
    const user = await User.findById(id);
    if (!user) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    user[field] = value
    await user.save()
    res.status(200).json({
        success: true,
    })

})

exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.query.id);
    if (!user) {
        return next(new errorHandler('This ID not not match any of our records'))
    }
    await user.remove()

    res.status(200).json({
        success: true,
    })

})

exports.currentUser = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        user: req.user,
        isAuthenticated: req.session?.isAuthenticated
    });
})


exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username }).select('+password')

    if (!user) {
        return next(new errorHandler('Username does not match our records'))
    }

    user.password = req.body.password
    const saveduser = await user.save()



    return res.status(200).json({
        success: true
    })
})

exports.verifyPin = asyncErrorHandler(async (req, res, next) => {
    const { pin } = req.body

    const verified = await User.findOne({ _id: req.user._id, pin: pin })

    if(!verified){
        return next(new errorHandler('Invalid OTP', 401))
    }

    // function to generate a pin of 6 digits
    const generatePin = () => {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const newPin = generatePin();
    const user = await User.findById(req.user._id);
    user.pin = newPin;
    await user.save();



    return res.status(200).json({
        success: true
    })
})




