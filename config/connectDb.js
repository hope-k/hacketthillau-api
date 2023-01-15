const mongoose = require('mongoose')
const colors = require('colors')
const connection = mongoose.connection


mongoose.connect(process.env.LOCAL_MONGO_URI)
    .then(() => console.log('MongoDB Connected'.bgMagenta.white.bold))
    .catch(err => console.log(`${err.message}`.bgRed.white.bold))

module.exports = connection
