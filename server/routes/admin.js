const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const authorize = require('../middleware/authorize')

router.get('/showInactive', authorize, adminController.showInActiveUsers)
router.post('/activateUser', authorize, adminController.activateUser)
router.get('/show', authorize, adminController.showNonAdmins)

module.exports = router