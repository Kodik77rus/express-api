const { Schema, model } = require('mongoose')
const validator = require('../utils')
const dictionary = require('../constants')

const ad = new Schema({
  title: {
    type: String,
    maxlength: 200,
    required: [true, dictionary.DICTIONARY.schema.title]
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, dictionary.DICTIONARY.schema.description]
  },
  price: {
    type: Number,
    min: 0,
    required: [true, dictionary.DICTIONARY.schema.price]
  },
  date: {
    type: Date,
    default: Date.now
  },
  imgURLs: {
    type: [String],
    validate: {
      validator: validator.arrayValidator,
      message: dictionary.DICTIONARY.schema.imgURLs
    }
  }
})

ad.path('imgURLs').validate(validator.shemaUrlValidator, dictionary.DICTIONARY.schema.validationUrl)

module.exports = model('Ad', ad)
