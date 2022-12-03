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

app.use(cors({
    origin: ['http://localhost:3000', 'https://hacketthillau.com', 'https://familytrustbank.netlify.app', 'https://familytrustbank-backend.herokuapp.com', ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // enable set cookie
    


}));




app.use(express.json());
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