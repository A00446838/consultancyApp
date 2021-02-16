const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authorize = require('../middleware/authorize')

router.post('/register', userController.register)

router.post('/ask', authorize, userController.ask)
router.post('/accept', authorize, userController.accept)


module.exports = router