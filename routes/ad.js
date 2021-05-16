const express = require('express')
const adControler = require('../controllers/ad')
const { authMiddleware } = require('../middleware/authMiddleware')
const { roleMiddlewaree } = require('../middleware/roleMiddleWare')
const {
  adValidator,
  adsValidation,
  updateAdValidation,
  deleteAdValidation
} = require('../middleware/validationMiddleware')

const router = express.Router()

router.get('/ads', authMiddleware, roleMiddlewaree(['USER']), adsValidation, adControler.getAds)
router.get('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), adValidator, adControler.getAd)
router.post('/ad', authMiddleware, roleMiddlewaree(['USER']), adControler.createAd)
router.put('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), updateAdValidation, adControler.updateAd)
router.delete('/ad/:id', authMiddleware, roleMiddlewaree(['USER']), deleteAdValidation, adControler.deleteAd)

module.exports = router
