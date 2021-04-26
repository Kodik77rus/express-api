const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  value: {
    type: String,
    uniq: true,
    default: 'USER'
  }
})

module.exports = model('Role', roleSchema)
