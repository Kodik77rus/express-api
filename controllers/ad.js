const adServces = require('../services/ad')

exports.createAd = async (req, res) => {
  try {
    const createdAd = await adServces.createAd(req.body)
    if (createdAd.hasOwnProperty('message')) {
      res.status(400).json({ message: createdAd.message })
    } else {
      res.status(201).json({ id: createdAd.id })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getTenAd = async (req, res) => {
  try {
    const sortAd = await adServces.getTenAd(req.query)
    if (sortAd.hasOwnProperty('message')) {
      res.status(400).json({ message: sortAd.message })
    } else {
      res.status(200).json(sortAd)
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOneAd = async (req, res) => {
  try {
    const ad = await adServces.getOneAd(req.param)
    res.status(200).json(ad)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}