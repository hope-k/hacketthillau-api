require('dotenv').config();
const connectDB = require('./config/connectDb')
const express = require('express');
const app = express();
const colors = require('colors');
const session = require('express-session')
const connection = require('./config/connectDb');
const MongoStore = require('connect-mongo');
const authRoute = require('./routes/authRoute');
const auth = require('./middlewares/auth');
const onError = require('./middlewares/onError');
const transactionRoute = require('./routes/transactionRoute');
const accountRoute = require('./routes/accountRoute')
const statRoute = require('./routes/statRoute')
const messageRoute = require('./routes/messageRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.set('trust proxy', 1)
app.use(cookieParser())
//... other middlewares

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});









app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }))





//authentication middleware


//routes

app.use('/api', messageRoute)
app.use('/api', statRoute)
app.use('/api', accountRoute)
app.use('/api', transactionRoute)
app.use('/api', authRoute)






//error middleware
app.use(onError)

app.listen(process.env.PORT || 5000, () => {
    console.log('---Server Started---'.bgGreen.black.italic.bold)
})
module.exports = app