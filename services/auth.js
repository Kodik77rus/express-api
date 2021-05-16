const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const Role = require('../model/role')
const secret = require('../configs/jwt.config')

const { AuthError } = require('../utils/index')
const { DICTIONARY, ACCESS_ROLES } = require('../constants/index')

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

exports.registrations = async user => {
  const { userName, password } = user
  const candidate = await User.findOne({ userName })
  if (candidate) {
    throw new AuthError(DICTIONARY.userAlreadyExist)
  }
  const hashPassword = bcrypt.hashSync(password, 7)
  const userRole = await Role.findOne({ value: ACCESS_ROLES.user })
  await new User({ userName, password: hashPassword, role: userRole.value }).save()
  return 'user seccsesfull registarate' //
}

exports.login = async user => {
  const { userName, password } = user
  const isValidUser = await User.findOne({ userName })
  if (!isValidUser) {
    throw new AuthError(DICTIONARY.UserNotFound)
  }
  const isValidPassword = bcrypt.compareSync(password, isValidUser.password)
  if (!isValidPassword) {
    throw new AuthError(DICTIONARY.badPassword)
  }
  const token = generateAccessToken(isValidUser._id, isValidUser.role)
  return token
}
