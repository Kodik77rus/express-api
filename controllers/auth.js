const authServces = require('../services/auth')
const { errorHandler } = require('../utils/index')

exports.registration = async (req, res) => {
  try {
    res.status(200).json(await authServces.registrations(req.body))
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.login = async (req, res) => {
  try {
    res.status(200).json(await authServces.login(req.body))
  } catch (err) {
    errorHandler(err, res)
  }
}

exports.resetPassword = async (req, res) => {
  try {
    res.status(200).json(await authServces.resetPassword(req.body))
  } catch (err) {
    errorHandler(err, res)
  }
}
