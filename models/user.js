const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'super-admin', 'user'],
            message: 'Role must be one of admin, super-admin or user'
        },
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,

    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'DOB is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required']
    },
    ssn: {
        type: String,
        required: [true, 'ssn is required']
    },

    address: {
        type: String,
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: 'Status must be either active or inactive'
        },
        default: 'inactive'
    },
    image: {
        url: {
            type: String,
        },
        public_id: {
            type: String,            
        }
    },
    pin: {
        type: String,
        minLength: [6, 'Pin must be 6 characters long'],
        maxLength: [6, 'Pin must be 6 characters long'],
        match: [/^\d+$/, 'Pin must be numeric'],
    }

}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'secret', { expiresIn: '30d' })
    return token
}

module.exports = mongoose.model('User', userSchema)