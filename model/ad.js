const dictionary = require('../constants')
const { Schema, model } = require('mongoose')

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
      validator: function (arr) {
        return arr.length > 1 && arr.length < 4 && Array.isArray(arr)
      },
      message: dictionary.DICTIONARY.schema.imgURLs
    }
  }
})

ad.path('imgURLs').validate((urls) => {
  urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  if (urls.map(u => urlRegex.test(u)).find(u => u === false) === undefined) {
    return true
  } else {
    return false
  }
}, dictionary.DICTIONARY.schema.validationUrl)

module.exports = model('Ad', ad)
