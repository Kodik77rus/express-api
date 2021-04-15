const express = require('express')

const adControler = require('../controllers/ad')

const router = express.Router()

router.get('/ads', adControler.getAds)
router.get('/ad/:id', adControler.getAd)
router.post('/ad', adControler.createAd)
router.put('/ad/:id', adControler.updateAd)
router.delete('/ad/:id', adControler.deleteAd)

module.exports = router
