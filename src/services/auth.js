const bcrypt = require('bcryptjs')

const User = require('../model/user')
const Role = require('../model/role')
const {
  generateAccessToken,
  AuthError,
} = require('../utils/index')
const {
  DICTIONARY,
  ACCESS_ROLES,
  PASSWORD_REGEX,
} = require('../constants/index')

exports.registrations = async user => {
  const { userName, password } = user
  console.log(userName, password)
  if (PASSWORD_REGEX.test(password)) {
    const candidate = await User.findOne({ userName })
    if (candidate) {
      throw new AuthError(DICTIONARY.authErrors.userAlreadyExist)
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const userRole = await Role.findOne({ value: ACCESS_ROLES.user })
    console.log(userRole)
    await new User({ userName, password: hashPassword, role: ACCESS_ROLES.user }).save()
    return 'user seccsesfull registarate' //
  }
  throw new AuthError(DICTIONARY.authErrors.badPassword)
}

exports.login = async user => {
  const { userName, password } = user
  const isValidUser = await User.findOne({ userName })
  if (!isValidUser) {
    throw new AuthError(DICTIONARY.authErrors.userNotFound)
  }
  const isValidPassword = bcrypt.compareSync(password, isValidUser.password)
  if (!isValidPassword) {
    throw new AuthError(DICTIONARY.authErrors.badPassword)
  }
  const token = generateAccessToken(isValidUser._id, isValidUser.role)
  return token
}
