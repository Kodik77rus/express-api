const { Schema, model } = require('mongoose')

const ad = new Schema({
  title: {
    type: String,
    maxlength: 200,
    required: [true, 'Ad title required']
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, 'Ad description required']
  },
  price: {
    type: Number,
    min: 0,
    required: [true, 'Ad price required']
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
      message: 'You must pass an array of more than 1 url and no more than 3 urls.'
    }
  }
})

ad.path('imgURLs').validate((urls) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  if (urls.map(u => urlRegex.test(u)).find(u => u === false) === undefined) {
    return true
  } else {
    return false
  }
}, 'Invalid URL.')

module.exports = model('Ad', ad)
