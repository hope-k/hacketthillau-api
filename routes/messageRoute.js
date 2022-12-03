
const messagesController = require("../controllers/messagesController");
const express = require('express');
const router = express.Router();
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const auth = require("../middlewares/auth");



router.get('/messages/:id?',auth, messagesController.messages);
router.post('/add-message',auth, authorizeAdmin, messagesController.addMessage);
router.put('/update-message',auth, authorizeAdmin, messagesController.updateMessage);
router.delete('/delete-message',auth, authorizeAdmin, messagesController.deleteMessage);
router.get('/all-messages',auth, authorizeAdmin, messagesController.allMessages);


module.exports = router

