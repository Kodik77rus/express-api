const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const Role = require('../model/role')
const { secret } = require('../configs/jwt.config')

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

exports.registrations = async user => {
  try {
    const { userName, password } = user
    const candidate = await User.findOne({ userName })
    if (candidate) {
      throw new Error('User alredy exist')
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({ value: 'USER' })
    const newUser = new User({ userName, password: hashPassword, role: userRole.value })
    await newUser.save()
    return "user seccsesfull registarate"
  } catch (err) {
    throw err
  }
}

exports.login = async user => {
  try {
    const { userName, password } = user
    const isValidUser = await User.findOne({ userName })
    if (!isValidUser) {
      throw new Error('User not found')
    }
    const isValidPassword = bcrypt.compareSync(password, isValidUser.password)
    if (!isValidPassword) {
      throw new Error('bad password')
    }
    const token = generateAccessToken(isValidUser._id, isValidUser.role)
    return token
  } catch (err) {
    throw err
  }
}

exports.resetPassword = async user => {
  try {

  } catch (err) {
    throw err
  }
}
