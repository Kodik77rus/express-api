const express = require('express')
const adControler = require('../controllers/ad')
const { authMiddleware } = require('../middleware/authMiddleware')
const { roleMiddlewaree } = require('../middleware/roleMiddleWare')

const router = express.Router()

router.get('/ads', authMiddleware, roleMiddlewaree(['USER']), adControler.getAds)
router.get('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), adControler.getAd)
router.post('/ad', authMiddleware, roleMiddlewaree(['USER']), adControler.createAd)
router.put('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), adControler.updateAd)
router.delete('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), adControler.deleteAd)

module.exports = router
