const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

router.get('/showInactive', authorize, adminController.showInActiveUsers)
router.post('/activateUser', authorize, adminController.activateUser)
router.get('/show', authorize, adminController.showNonAdmins)

router.get('/showConsultants', authorize, userController.showConsultants)

module.exports = router