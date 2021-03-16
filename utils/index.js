
exports.URL_FOR_CONNECT_TO_DB = 'mongodb+srv://george:Z34vE8Nm3xaiifoF@cluster0.fihkq.mongodb.net/ads?retryWrites=true&w=majority'

exports.PAGE_SIZE = 10

const VALID_QUERY_REQ_SORT = [
  'byPriceAsс', 'byPriceDesc',
  'byDateAsc', 'byDateDesc',
]

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
