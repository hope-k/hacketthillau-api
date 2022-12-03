const mongoose = require('mongoose');


const statSchema = new mongoose.Schema({

    income: {
        year: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },

    expense:{
        year: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },


    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },

    

})

module.exports = mongoose.model('Stat', statSchema)