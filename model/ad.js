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
  img: [{
    type: String,
    maxItems: 3
  }]
})

module.exports = model('Ad', ad)
