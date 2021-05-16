const express = require('express')

const authControler = require('../controllers/auth')

const router = express.Router()

router.post('/registration', authControler.registration)
router.post('/login', authControler.login)

module.exports = router
