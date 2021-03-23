const Ad = require('../model/ad')
const { querySortValidator, queryAdValidator } = require('../utils')
const { PAGE_SIZE, DICTIONARY } = require('../constants')

exports.createAd = async (ad) => {
  try {
    const postedAd = await new Ad(ad).save()
    return postedAd
  } catch (err) {
    return err
  }
}

exports.getAds = async (query) => {
  try {
    const isValid = querySortValidator(query)
    if (isValid) {
      return await Ad.find({}, { title: 1, price: 1, mainUrl: { $first: "$imgURLs" }, _id: 0 })
        .sort(isValid)
        .skip(PAGE_SIZE * (query.page - 1))
        .limit(PAGE_SIZE)
    } else {
      throw new Error(DICTIONARY.errors.badRequest)
    }
  } catch (err) {
    return err
  }
}

exports.getAd = async (ad) => {
  try {
    const isValid = queryAdValidator(ad)
    if (isValid) {
      return await Ad.findById(ad.paramId, isValid)
    } else {
      throw new Error(DICTIONARY.errors.badRequest)
    }
  } catch (err) {
    return err
  }
}
