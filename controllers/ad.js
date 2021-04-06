const adServces = require('../services/ad')
const { serverError } = require('../utils/index')

exports.getAd = async (req, res) => {
  try {
    const ad = await adServces.getAd(req.params.id, req.query)
    if (ad.hasOwnProperty('message')) {
      res.status(400).json({ ERROR_MESSAGE: ad.message })
    } else {
      res.status(200).json(ad)
    }
  } catch (err) {
    serverError(res, err.message)
  }
}

exports.getAds = async (req, res) => {
  try {
    const sortAd = await adServces.getAds(req.query)
    if (sortAd.hasOwnProperty('message')) {
      res.status(400).json({ ERROR_MESSAGE: sortAd.message })
    } else {
      res.status(200).json(sortAd)
    }
  } catch (err) {
    serverError(res, err.message)
  }
}

exports.createAd = async (req, res) => {
  try {
    const createdAd = await adServces.createAd(req.body)
    if (createdAd.hasOwnProperty('message')) {
      res.status(400).json({ ERROR_MESSAGE: createdAd.message })
    } else {
      res.status(201).json({ id: createdAd.id })
    }
  } catch (err) {
    serverError(res, err.message)
  }
}

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await adServces.updateAd(req.params.id, req.body)
    if (updatedAd.hasOwnProperty('message')) {
      res.status(400).json({ ERROR_MESSAGE: updatedAd.message })
    } else {
      res.status(200).json(updatedAd)
    }
  } catch (err) {
    serverError(res, err.message)
  }
}

exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await adServces.deleteAd(req.params.id)
    if (deletedAd.hasOwnProperty('message')) {
      res.status(400).json({ ERROR_MESSAGE: deletedAd.message })
    } else {
      res.status(200).json({ id: deletedAd.id })
    }
  } catch (err) {
    serverError(res, err.message)
  }
}
