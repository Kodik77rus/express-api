const express = require('express')
const adControler = require('../controllers/ad.js')

const router = express.Router()

router.get('/ads', adControler.getAds)

router.get('/ad/:id', adControler.getAd)

router.post('/ad', adControler.createAd)

module.exports = router
