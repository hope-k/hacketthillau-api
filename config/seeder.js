require('dotenv').config();
const Account = require('../models/account')
const Transaction = require('../models/transaction')
const Message = require('../models/message')
const Stat = require('../models/stat')
const colors = require('colors')
const connectDb = require('./connectDb')
const accounts = require('../data/accounts')
const stats = require('../data/stats')
const messages = require('../data/messages')
const transactions = require('../data/transactions')


async function insertData() {
    try {
        // connect database
        connectDb()
        // delete all data in collection
        await Transaction.deleteMany()
        await Message.deleteMany()
        await Stat.deleteMany()
        console.log('Collections Deleted'.green)



        // insert data
        await Transaction.insertMany(transactions);
        await Message.insertMany(messages);
        await Stat.insertMany(stats);

        console.log('Data Inserted'.green)



        //terminate process
        process.exit()

    } catch(err) {
        console.log(colors.red(err.message))
    }
}
insertData();