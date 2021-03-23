const { VALID_QUERY_REQ_SORT, VALID_QUERY_GET_AD } = require('../constants')

exports.notFoundError = (_, res) => res.status(404).json("Not Found")

exports.serverError = (err) => res.status(404).json({massage: err})

exports.shemaArrayValidator = (arr) => {
  return arr.length > 0 && arr.length < 4 && Array.isArray(arr)
}

exports.shemaUrlValidator = (urls) => {
  urlRegex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  if (urls.map(u => urlRegex.test(u)).find(u => u === false) === undefined) {
    return true
  } else {
    return false
  }
}

const isСontains = (initialValue, checkValue) => initialValue.includes(checkValue)

exports.querySortValidator = (query) => {
  if (query.sort && +query.page > 0) {
    if (isСontains(query.sort, ',')) {
      const keys = query.sort.split(',')
      if (
        keys.length === 2 &&
        keys[0] !== keys[1] &&
        isСontains(VALID_QUERY_REQ_SORT, keys[0]) &&
        isСontains(VALID_QUERY_REQ_SORT, keys[1])
      ) {
        if (isСontains(keys[0], 'Price') && !(isСontains(keys[1], 'Price'))) {
          return {
            price: isСontains(keys[0], 'Asс') ? 1 : -1,
            date: isСontains(keys[1], 'Asс') ? 1 : -1
          }
        } else if (isСontains(keys[0], 'Date') && !(isСontains(keys[1], 'Date'))) {
          return {
            price: isСontains(keys[1], 'Asс') ? 1 : -1,
            date: isСontains(keys[0], 'Asс') ? 1 : -1
          }
        } else {
          return false
        }
      } else {
        return false
      }
    } else if (
      !(isСontains(query.sort, ',')) &&
      isСontains(VALID_QUERY_REQ_SORT, query.sort)
    ) {
      if (isСontains(query.sort, 'Price')) {
        return {
          price: isСontains(query.sort, 'Asc') ? 1 : -1
        }
      } else {
        return {
          date: isСontains(query.sort, 'Asc') ? 1 : -1
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
        isСontains(VALID_QUERY_GET_AD, key[0]) &&
        isСontains(VALID_QUERY_GET_AD, key[1])
      ) {
        return {
          title: 1,
          price: 1,
          description: 1,
          imgURLs: 1,
          _id: 0
        }
      } else if (
        key.length === 1 &&
        isСontains(VALID_QUERY_GET_AD, key[0])
      ) {
        if (isСontains(key[0], 'description')) {
          return {
            title: 1,
            price: 1,
            description: 1,
            _id: 0
          }
        } else {
          return {
            title: 1,
            price: 1,
            imgURLs: 1,
            _id: 0
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
      _id: 0
    }
  } else {
    return false
  }
}
