const { Schema, model } = require('mongoose')

const userShema = new Schema({
  userName: {
    type: String,
    uniq: true,
    required: true
  },
  password: {
    type: String,
    require: true,
  },
  roles: {
    type: String,
    ref: 'Role',
  },
  regDate: {
    type: Date,
    default: Date.now
  },
  ads: {
    type: Array,
    ref: 'Ads'
  }
})

module.exports = model('User', userShema)
