const mongoose = require('mongoose');


const accountSchema = new mongoose.Schema({
    accountType: {
        type: String,
        enum: {
            values: ['checking', 'savings', 'investments']
        },
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('Account', accountSchema)