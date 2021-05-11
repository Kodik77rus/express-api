const jwt = require('jsonwebtoken')
const { secret } = require('../configs/jwt.config')

exports.authMiddleware=(req,res,next) => {
  if (req.method === 'OPTIONS'){
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
      res.status(403).json({ message: 'user not authorizate' })
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (err) {
    return res.status(403).json({ message: 'user not authorizate' })
  }
}