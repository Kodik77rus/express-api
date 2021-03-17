//full refactor

const VALID_QUERY_REQ_SORT = [
  'byPriceAsс', 'byPriceDesc',
  'byDateAsc', 'byDateDesc',
]

const VALID_QUERY_GET_AD = [
  'description', 'imgURLs',
]

exports.URL_FOR_CONNECT_TO_DB = 'mongodb+srv://george:Z34vE8Nm3xaiifoF@cluster0.fihkq.mongodb.net/ads?retryWrites=true&w=majority'

exports.PAGE_SIZE = 10

exports.querySortValidator = (query) => {
  if (query.sort && +query.page > 0) {
    if (query.sort.includes(',')) {
      const keys = query.sort.split(',')
      if (
        keys.length === 2 &&
        keys[0] !== keys[1] &&
        VALID_QUERY_REQ_SORT.includes(keys[0]) &&
        VALID_QUERY_REQ_SORT.includes(keys[1])
      ) {
        if (keys[0].includes('Price') && !(keys[1].includes('Price'))) {
          return {
            price: keys[0].includes('Asс') ? 1 : -1,
            date: keys[1].includes('Asс') ? 1 : -1
          }
        } else if (keys[0].includes('Date') && !(keys[1].includes('Date'))) {
          return {
            price: keys[1].includes('Asс') ? 1 : -1,
            date: keys[0].includes('Asс') ? 1 : -1
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else if (
      !(query.sort.includes(',')) &&
      VALID_QUERY_REQ_SORT.includes(query.sort)
    ) {
      if (query.sort.includes('Price')) {
        return {
          price: query.sort.includes('Asc') ? 1 : -1
        }
      } else {
        return {
          date: query.sort.includes('Asc') ? 1 : -1
        }
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

exports.queryAdValidator = (query) => {
  if (query.paramId && Object.keys(query.query).length === 1) {
    if (query.query) {
      const key = query.query.fields.split(',')
      if (key.length === 2 &&
        VALID_QUERY_GET_AD.includes(key[0]) &&
        VALID_QUERY_GET_AD.includes(key[1])
      ) {
        return {
          title: 1,
          price: 1,
          description: 1,
          imgURLs: 1,
          _id: 0,
        }
      } else if (
        key.length === 1 &&
        VALID_QUERY_GET_AD.includes(key[0])
      ) {
        if (key[0].includes('description')) {
          return {
            title: 1,
            price: 1,
            description: 1,
            _id: 0,
          }
        } else {
          return {
            title: 1,
            price: 1,
            imgURLs: 1,
            _id: 0,
          }
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (query.paramId && Object.keys(query.query).length === 0) {
    return {
      title: 1,
      price: 1,
      mainUrl: { $first: "$imgURLs" },
      _id: 0,
    }
  } else {
    return false
  }
}
