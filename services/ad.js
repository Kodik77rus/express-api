const Ad = require('../model/ad')
const utils = require('../utils')

exports.createAd = async (ad) => {
  try {
    const postedAd = await new Ad(ad).save()
    return postedAd
  } catch (err) {
    return err
  }
}

exports.getTenAd = async (query) => {
  try {
    const isValid = utils.querySortValidator(query)
    if (isValid) {
      return await Ad.find({}, { title: 1, price: 1, mainUrl: { $first: "$imgURLs" }, _id: 0 })
        .sort(isValid)
        .skip(utils.PAGE_SIZE * (+query.page - 1))
        .limit(utils.PAGE_SIZE)
    } else {
      throw new Error('Bad request')
    }
  } catch (err) {
    return err
  }
}

exports.getOneAd = async () => {
  //req to db
  // return ad
}