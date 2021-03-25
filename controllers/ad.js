const adServces = require('../services/ad')
const { serverError } = require('../utils/index')

exports.createAd = async (req, res) => {
  try {
    const createdAd = await adServces.createAd(req.body)
    if (createdAd.hasOwnProperty('message')) {
      res.status(400).json({ message: createdAd.message })
    } else {
      res.status(201).json({ id: createdAd.id })
    }
  } catch (err) {
    serverError(err.message)
  }
}

exports.getAds = async (req, res) => {
  try {
    const sortAd = await adServces.getAds(req.query)
    if (sortAd.hasOwnProperty('message')) {
      res.status(400).json({ message: sortAd.message })
    } else {
      res.status(200).json(sortAd)
    }
  } catch (err) {
    serverError(err.message)
  }
}

exports.getAd = async (req, res) => {
  try {
    const ad = await adServces.getAd(req.params.id, req.query)
    if (ad.hasOwnProperty('message')) {
      res.status(400).json({ message: ad.message })
    } else {
      res.status(200).json(ad)
    }
  } catch (err) {
    serverError(err.message)
  }
}
