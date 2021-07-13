const express = require('express')

const authControler = require('../controllers/auth')
const { authValidator } = require('../middleware/validationMiddleware')

const router = express.Router()

router.post('/registration', authValidator, authControler.registration)
router.post('/login', authValidator, authControler.login)

module.exports = router
