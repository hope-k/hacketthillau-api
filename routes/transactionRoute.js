const transactionsController = require("../controllers/transactionsController");
const express = require('express');
const router = express.Router();
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const auth = require("../middlewares/auth");


router.get('/transactions',auth, transactionsController.myTransactions);
router.post('/add-transaction',auth, transactionsController.addTransaction);
router.put('/update-transaction',auth, authorizeAdmin, transactionsController.updateTransaction);
router.delete('/delete-transaction',auth, authorizeAdmin, transactionsController.deleteTransaction);
router.get('/all-transactions', auth, authorizeAdmin, transactionsController.allTransactions);
router.post('/admin-deposit',auth, authorizeAdmin, transactionsController.adminDeposit);



module.exports = router;

