const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },


},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', messageSchema)