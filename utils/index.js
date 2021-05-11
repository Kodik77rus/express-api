const {
  VALID_QUERY_REQ_SORT,
  VALID_QUERY_GET_AD,
  PARSED_OBJECTS,
  DICTIONARY,
  URL_REGEX,
} = require('../constants')

exports.ValidationError = class extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

exports.shemaArrayValidator = arr => arr.length > 0 && arr.length < 4 && Array.isArray(arr)

exports.shemaUrlValidator = urls => {
  if (urls.map(u => URL_REGEX.test(u)).includes(false)) { return false } else { return true }
}

exports.queryAdValidator = query => {
  const countParam = isValidQuery(query, VALID_QUERY_GET_AD)
  if (countParam) { return adParser(countParam, query) }
  else { return false }
}

exports.querySortValidator = query => {
  const countParam = isValidQuery(query.sort, VALID_QUERY_REQ_SORT)
  if (countParam) { return sortParser(countParam, query.sort) }
  else { return false }
}

exports.updateAdlidator = body => {
  if (body.imgURLs || body.title || body.description || body.price) {
    return true
  } else {
    return false
  }
}

exports.errorHandler = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ ERROR_MESSAGE: err.message })
  } else { res.status(500).json({ ERROR_MESSAGE: err }) }
}

exports.notFoundError = (_, res) => res.status(404).json(DICTIONARY.errors.notFound)

function isСontains(initialValue, checkValue) { return initialValue.includes(checkValue) }

function isValidQuery(query, dictionary) {
  if (typeof query === 'string') {
    const result = query.split(',')
    if (result.length < 3) {
      const arrayFilter = result.filter((p, i, arr) => isСontains(dictionary, p) && arr.indexOf(p) === i)
      if (arrayFilter.length > 0) { return arrayFilter.length }
      else { return false }
    }
    else { return false }
  } else { return false }
}

function adParser(countParam, query) {
  const keys = query.split(',')
  if (countParam === 2) { return PARSED_OBJECTS.withTwoParams }
  if (countParam === 1 && isСontains(keys[0], 'description')) { return PARSED_OBJECTS.withDescription }
  if (countParam === 1 && isСontains(keys[0], 'imgURLs')) { return PARSED_OBJECTS.withImgURLs }
}

function sortParser(countParam, query) {
  const keys = query.split(',')
  if (countParam === 2 && isСontains(query, 'Price')) {
    return {
      price: isСontains(keys[0], 'Asc') ? 1 : -1,
      date: isСontains(keys[1], 'Asc') ? 1 : -1,
    }
  } else if (countParam === 2) {
    return {
      price: isСontains(keys[1], 'Asc') ? 1 : -1,
      date: isСontains(keys[0], 'Asc') ? 1 : -1,
    }
  } else if (countParam === 1 && isСontains(query, 'Price')) {
    return { price: isСontains(keys[0], 'Asc') ? 1 : -1 }
  } else { return { date: isСontains(keys[0], 'Asc') ? 1 : -1 } }
}
