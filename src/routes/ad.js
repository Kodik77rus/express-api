const express = require('express')

const adControler = require('../controllers/ad')
const { authMiddleware } = require('../middleware/authMiddleware')
const { roleMiddlewaree } = require('../middleware/roleMiddleWare')
const {
  adValidator,
  adsValidation,
  updateAdValidation,
  deleteAdValidation,
} = require('../middleware/validationMiddleware')
const { ACCESS_ROLES } = require('../constants/index')

const router = express.Router()

router.get('/ads', authMiddleware, roleMiddlewaree([ACCESS_ROLES.user, ACCESS_ROLES.admin]), adsValidation, adControler.getAds)
router.get('/ad/:id', authMiddleware, roleMiddlewaree([ACCESS_ROLES.user, ACCESS_ROLES.admin]), adValidator, adControler.getAd)
router.post('/ad', authMiddleware, roleMiddlewaree([ACCESS_ROLES.user, ACCESS_ROLES.admin]), adControler.createAd)
router.put('/ad/:id', authMiddleware, roleMiddlewaree([ACCESS_ROLES.user, ACCESS_ROLES.admin]), updateAdValidation, adControler.updateAd)
router.delete('/ad/:id', authMiddleware, roleMiddlewaree([ACCESS_ROLES.user, ACCESS_ROLES.admin]), deleteAdValidation, adControler.deleteAd)

module.exports = router
