const mongoose  = require('mongoose')

const Schema = mongoose.Schema
const model = mongoose.model

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
  role: {
    type: String,
    ref: 'Role',
  },
  regDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('User', userShema)
