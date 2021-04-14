const adServces = require('../services/ad')
const { errorHandler } = require('../utils/index')

exports.getAd = async (req, res) => {
  try {
    res.status(200).json(await adServces.getAd(req.params.id, req.query))
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.getAds = async (req, res) => {
  try {
    res.status(200).json(await adServces.getAds(req.query))
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.createAd = async (req, res) => {
  try {
    res.status(201).json({ id: await adServces.createAd(req.body) })
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.updateAd = async (req, res) => {
  try {
    res.status(200).json(await adServces.updateAd(req.params.id, req.body))
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.deleteAd = async (req, res) => {
  try {
    res.status(200).json({ id: await adServces.deleteAd(req.params.id) })
  } catch (err) {
    errorHandler(err, res)
  }
}
