const express = require('express')
const adControler = require('../controllers/ad.js')

const router = express.Router()

router.get('/ads', adControler.getTenAd)

router.get('ad/:id', adControler.getOneAd)

router.post('/ad', adControler.createAd)

module.exports = router
