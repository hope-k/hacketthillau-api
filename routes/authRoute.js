const express = require('express');
const router = express.Router()
const authController = require('../api/authController');
const auth = require('../middlewares/auth');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const authorizeSuperAdmin = require('../middlewares/authorizeSuperAdmin');


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/verify-pin', auth, authController.verifyPin)
router.post('/logout', authController.logout)
router.get('/me', auth, authController.currentUser)
router.put('/update-user', auth, authorizeAdmin, authController.updateUser)
router.delete('/delete-user', auth, authorizeAdmin, authController.deleteUser)
router.get('/all-users', auth, authorizeAdmin, authController.allUsers)
router.post('/reset-password', auth, authController.resetPassword)
router.delete('/delete-user', auth, authorizeAdmin, authorizeSuperAdmin, authController.deleteUser)
router.get('/all-users', auth, authorizeAdmin, authController.allUsers)
router.post('/reset-password', auth, authorizeSuperAdmin , authController.resetPassword)

















module.exports = router