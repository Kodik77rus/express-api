const {
  PARSED_OBJECTS,
  DICTIONARY,
  URL_REGEX,
} = require('../constants/index')

exports.updateAdlidator = body => {
  if (body.imgURLs || body.title || body.description || body.price) {
    return true
  }
  return false
}

exports.shemaArrayValidator = arr => arr.length > 0 && arr.length < 4 && Array.isArray(arr)

exports.shemaUrlValidator = urls => !urls.map(u => URL_REGEX.test(u)).includes(false)

exports.isValidQuery = (query, dictionary) => {
  const result = query.split(',')
  if (result.length < 3) {
    const count = result.filter((p, i, arr) => isСontains(dictionary, p) && arr.indexOf(p) === i)
    if (count.length > 0) {
      return result.length
    }
    return false
  }
}

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

exports.errorHandler = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ VALIDATION_ERROR: err.message })
  } else if (err.name === 'AuthError') {
    res.status(403).json({ AUTH_ERROR: err.message })
  }
  else {
    res.status(500).json({ ERROR_MESSAGE: err })
  }
}

const isСontains = (initialValue, checkValue) => initialValue.includes(checkValue)
