const adServces = require('../services/ad')

exports.createAd = async (req, res) => {
  try {
    const ad = await adServces.createAd(req.body)
    res.status(201).json(ad.id)
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}

exports.getTenAd = async (req, res) => {
  try {
    const sortAd = adServces.getTenAd(req.query)
    res.status(201).json(sortAd)
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}

exports.getOneAd = async (req, res) => {
  try {
    const ad = await adServces.getOneAd(req.param)
    res.status(200).json(ad)
  } catch (err) {
    res.status(500).json({ messege: err.messege })
  }
}