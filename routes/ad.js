const express = require('express')
const router = express.Router()


router.get('/ads')

router.get('ad/:id')

router.post('/ad')

module.exports = router
