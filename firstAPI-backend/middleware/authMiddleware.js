const jwt = require('jsonwebtoken')

const { DICTIONARY } = require('../constants/index')

exports.authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(403).json({ AUTH_ERROR: DICTIONARY.userNotAuth })
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData
    next()
  } catch (err) {
    return res.status(403).json({ AUTH_ERROR: DICTIONARY.userNotAuth })
  }
}