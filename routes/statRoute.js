
const statsController = require("../controllers/statsController");
const express = require('express');
const router = express.Router();
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const auth = require("../middlewares/auth");



router.get('/stats',auth, statsController.myStats);
router.post('/add-stat',auth, authorizeAdmin, statsController.addStat);
router.delete('/delete-stat',auth, authorizeAdmin, statsController.deleteStat);
router.get('/all-stats',auth, authorizeAdmin, statsController.allStats);


module.exports = router

