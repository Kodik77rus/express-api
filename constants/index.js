exports.URL_FOR_CONNECT_TO_DB = 'mongodb+srv://george:Z34vE8Nm3xaiifoF@cluster0.fihkq.mongodb.net/firstApi_v2?retryWrites=true&w=majority'

exports.URL_REGEX = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

exports.PAGE_SIZE = 10

exports.ACCESS_ROLES = {
  user: 'USER',
  admin: 'ADMIN',
}

exports.VALID_QUERY_REQ_SORT = [
  'byPriceAsc', 'byPriceDesc',
  'byDateAsc', 'byDateDesc',
]

exports.VALID_QUERY_GET_AD = [
  'description', 'imgURLs',
]

exports.DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss'

exports.PARSED_OBJECTS = {
  withoutParams: {
    title: 1,
    price: 1,
    mainUrl: { $first: '$imgURLs' },
    _id: 0,
  },
  withTwoParams: {
    title: 1,
    price: 1,
    description: 1,
    imgURLs: 1,
    _id: 0,
  },
  withDescription: {
    title: 1,
    price: 1,
    description: 1,
    mainUrl: { $first: '$imgURLs' },
    _id: 0,
  },
  withImgURLs: {
    title: 1,
    price: 1,
    imgURLs: 1,
    _id: 0,
  },
  withDate: {
    title: 1,
    price: 1,
    mainUrl: { $first: '$imgURLs' },
    date: 1,
    _id: 0,
  },
}

exports.DICTIONARY = {
  schemaErrors: {
    title: 'Ad title required',
    description: 'Ad description required',
    price: 'Ad price required',
    imgURLs: 'You must pass an array of more than 1 url and no more than 3 urls',
    validationUrl: 'Invalid URL, URL must contains http or https',
  },
  validationErrors: {
    badRequest: 'Bad Request',
    notFound: 'Not Found',
    badId: 'Bad ID',
    adNotFound: 'Ad Not Found',
    badFields: 'Bad Fields',
    badBody: 'Bad Body Fields',
    badSortFields: 'Bad Sort Fields',
    badPage: 'Page must be > 0',
    noContentOnPage: 'No content on page, try enter a smaller page',
  },
  authErrors: {
    userNotAuth: 'user not authorizate',
    accessDenied: 'acсess denied',
    userAlreadyExist: 'User already exist',
    UserNotFound: 'User not found',
    badPassword: 'Bad password',
  },
}
