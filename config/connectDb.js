const mongoose = require('mongoose')
const colors = require('colors')
const connection = mongoose.connection
const production = process.env.NODE_ENV === 'production'


mongoose.connect( production ? process.env.MONGO_URI : process.env.LOCAL_MONGO_URI, )
    .then(() => console.log('MongoDB Connected'.bgMagenta.white.bold))
    .catch(err => console.log(`${err.message}`.bgRed.white.bold))

module.exports = connection
