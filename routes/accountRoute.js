const accountsController = require("../controllers/accountsController");
const express = require('express');
const router = express.Router();
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const auth = require("../middlewares/auth");



router.get('/accounts',auth, accountsController.myAccounts);
router.post('/add-account',auth, authorizeAdmin, accountsController.addAccount);
router.put('/update-account',auth, authorizeAdmin, accountsController.updateAccount);
router.delete('/delete-account',auth, authorizeAdmin, accountsController.deleteAccount);
router.get('/all-accounts',auth, authorizeAdmin, accountsController.allAccounts);




module.exports = router

