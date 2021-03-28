const adServces = require('../services/ad')
const { clientError } = require('../utils/index')

exports.getAd = async (req, res) => {
  try {
    const ad = await adServces.getAd(req.params.id, req.query)
    if (ad.hasOwnProperty('message')) {
      res.status(202).json({ message: ad.message })
    } else {
      res.status(200).json(ad)
    }
  } catch (err) {
    clientError(res, err.message)
  }
}

exports.getAds = async (req, res) => {
  try {
    const sortAd = await adServces.getAds(req.query)
    if (sortAd.hasOwnProperty('message')) {
      res.status(202).json({ Error: sortAd.message })
    } else {
      res.status(200).json(sortAd)
    }
  } catch (err) {
    clientError(res, err.message)
  }
}

exports.createAd = async (req, res) => {
  try {
    const createdAd = await adServces.createAd(req.body)
    if (createdAd.hasOwnProperty('message')) {
      res.status(202).json({ Error: createdAd.message })
    } else {
      res.status(201).json({ id: createdAd.id })
    }
  } catch (err) {
    clientError(res, err.message)
  }
}

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await adServces.updateAd(req.params.id, req.body)
    if (updatedAd.hasOwnProperty('message')) {
      res.status(202).json({ Error: updatedAd.message })
    } else {
      res.status(200).json(updatedAd)
    }
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}

exports.deleteAd = async (req, res) => {
  try {
    const deletedAd = await adServces.deleteAd(req.params.id)
    if (deletedAd.hasOwnProperty('message')) {
      res.status(202).json({ Error: deletedAd.message })
    } else {
      res.status(200).json({ id: deletedAd.id })
    }
  } catch (err) {
    res.status(400).json({ Error: err.message })
  }
}
