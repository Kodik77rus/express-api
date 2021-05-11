const mongoose = require('mongoose')
const { shemaArrayValidator, shemaUrlValidator } = require('../utils')
const { DICTIONARY } = require('../constants')

const Schema = mongoose.Schema
const model = mongoose.model

const adsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  title: {
    type: String,
    maxlength: 200,
    required: [true, DICTIONARY.schema.title],
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, DICTIONARY.schema.description],
  },
  price: {
    type: Number,
    min: 0,
    required: [true, DICTIONARY.schema.price],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imgURLs: {
    type: [String],
    validate: {
      validator: shemaArrayValidator,
      message: DICTIONARY.schema.imgURLs,
    },
  },
})

adsSchema.path('imgURLs').validate(shemaUrlValidator, DICTIONARY.schema.validationUrl)

module.exports = model('Ads', adsSchema)
