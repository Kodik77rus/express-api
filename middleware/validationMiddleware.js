const mongoose = require('mongoose')

const {
  DICTIONARY,
  VALID_QUERY_REQ_SORT,
  VALID_QUERY_GET_AD,
} = require('../constants')
const {
  updateAdlidator,
  isValidQuery,
  authBodyValidator,
} = require('../utils/index')

exports.adValidator = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ VALIDATION_ERROR: DICTIONARY.validationErrors.badId })
    }
    if (req.query.fields) {
      const isValid = isValidQuery(req.query.fields, VALID_QUERY_GET_AD)
      if (!isValid) {
        return res.status(400).send({ VALIDATION_ERROR: DICTIONARY.validationErrors.badFields })
      }
      req.query.countQuery = isValid
      next()
    } else {
      req.query.countQuery = 0
      next()
    }
  } catch {
    return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
  }
}

exports.adsValidation = (req, res, next) => {
  try {
    if (!req.query.sort && !req.query.page) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
    }
    if (!+req.query.page > 0) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badPage })
    }
    const isValid = isValidQuery(req.query.sort, VALID_QUERY_REQ_SORT)
    if (!isValid) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badSortFields })
    }
    req.query.countQuery = isValid
    next()
  } catch {
    return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
  }
}

exports.updateAdValidation = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badId })
    }
    const isValid = updateAdlidator(req.body)
    if (!isValid) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badBody })
    }
    next()
  } catch {
    return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
  }
}

exports.deleteAdValidation = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badId })
    }
    next()
  } catch {
    return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
  }
}

exports.authValidator = (req, res, next) => {
  try {
    const isValid = authBodyValidator(req.body)
    if (!isValid) {
      return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badBody })
    }
    next()
  } catch {
    return res.status(400).json({ VALIDATION_ERROR: DICTIONARY.validationErrors.badRequest })
  }
}