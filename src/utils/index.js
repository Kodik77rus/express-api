const jwt = require('jsonwebtoken')

const {
  PARSED_OBJECTS,
  DICTIONARY,
  URL_REGEX,
} = require('../constants/index')

exports.generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
}

exports.isValidQuery = (query, dictionary) => {
  if (typeof query === 'string') {
    const result = query.split(',')
    if (result.length < 3) {
      const count = result.filter((p, i, arr) => isСontains(dictionary, p) && arr.indexOf(p) === i)
      if (count.length > 0) {
        return result.length
      }
    }
  }
  return false
}

exports.shemaArrayValidator = arr => arr.length > 0 && arr.length < 4 && Array.isArray(arr)

exports.shemaUrlValidator = urls => !urls.map(u => URL_REGEX.test(u)).includes(false)

exports.updateAdlidator = body => body.imgURLs || body.title || body.description || body.price

exports.authBodyValidator = body => body.userName && body.password

exports.adParser = (countParam, query) => {
  if (countParam === 0) {
    return PARSED_OBJECTS.withoutParams
  }
  const keys = query.split(',', 1)
  if (countParam === 2) {
    return PARSED_OBJECTS.withTwoParams
  }
  if (countParam === 1) {
    if (isСontains(keys[0], 'description')) {
      return PARSED_OBJECTS.withDescription
    }
    return PARSED_OBJECTS.withImgURLs
  }
}

exports.sortAdsParser = (countParam, query) => {
  const keys = query.split(',')
  if (countParam === 2) {
    if (isСontains(query, 'Price')) {
      return {
        price: isСontains(keys[0], 'Asc') ? 1 : -1,
        date: isСontains(keys[1], 'Asc') ? 1 : -1,
      }
    }
    return {
      price: isСontains(keys[1], 'Asc') ? 1 : -1,
      date: isСontains(keys[0], 'Asc') ? 1 : -1,
    }
  }
  if (countParam === 1 && isСontains(query, 'Price')) {
    return { price: isСontains(keys[0], 'Asc') ? 1 : -1 }
  }
  return { date: isСontains(keys[0], 'Asc') ? 1 : -1 }
}

exports.errorHandler = (err, res) => {
  switch (err.name) {
  case 'ValidationError':
    res.status(400).json({ VALIDATION_ERROR: err.message })
    break
  case 'AuthError':
    res.status(403).json({ AUTH_ERROR: err.message })
    break
  default:
    res.status(500).json({ ERROR_MESSAGE: err.message })
  }
}

exports.notFoundError = (_, res) => res.status(404).json(DICTIONARY.errors.notFound)

exports.ValidationError = class extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

exports.AuthError = class extends Error {
  constructor(message) {
    super(message)
    this.name = 'AuthError'
  }
}

const isСontains = (initialValue, checkValue) => initialValue.includes(checkValue)
