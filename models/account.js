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
    currency: {
        type: String,
        enum: {
            values: ['usd', 'eur', 'gbp', 'cad', 'aud', 'inr', 'cny', 'jpy', 'krw', 'rub', 'brl', 'zar', 'ngn', 'kes', 'ghs', 'ugx', 'tzs', 'zwd', 'zmk', 'xof', 'xaf', 'xdr']
        },
        required: true,
        default: 'usd'
    },
})

module.exports = mongoose.model('Account', accountSchema)