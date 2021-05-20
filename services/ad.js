const moment = require('moment')

const Ads = require('../model/ad')
const {
  ValidationError,
  adParser,
  sortAdsParser,
} = require('../utils')
const {
  PAGE_SIZE,
  DICTIONARY,
  PARSED_OBJECTS,
  DATE_FORMAT,
} = require('../constants')

exports.getAd = async (adId, query) => {
  const parsedAdQuery = adParser(query.countQuery, query.fields)
  const ad = await Ads.findById(adId, parsedAdQuery)
  if (ad !== null) {
    return ad
  }
  throw new ValidationError(DICTIONARY.validationErrors.adNotFound)
}

exports.getAds = async (query, user) => {
  const parsedAdsQuery = sortAdsParser(query.countQuery, query.sort)
  const ads = await Ads
    .find({ userId: user.id }, parsedAdsQuery.date ? PARSED_OBJECTS.withDate : PARSED_OBJECTS.withoutParams)
    .skip(PAGE_SIZE * (query.page - 1))
    .limit(PAGE_SIZE)
    .sort(parsedAdsQuery)
  if (ads.length > 0) {
    return parsedAdsQuery.date ? ads.map(a => ({
      title: a.title,
      price: a.price,
      mainUrl: a.mainUrl,
      date: moment(a.date).format(DATE_FORMAT),
    })) : ads
  }
  throw new ValidationError(DICTIONARY.validationErrors.noContentOnPage)
}

exports.createAd = async (ad, user) => {
  ad.userId = user.id
  const createdAd = await new Ads(ad).save()
  return createdAd._id
}

exports.updateAd = async (adId, body) => {
  const newAd = await Ads.findOneAndUpdate({ _id: adId }, body, { new: true })
  if (newAd !== null) {
    return newAd
  }
  throw new ValidationError(DICTIONARY.validationErrors.adNotFound)
}

exports.deleteAd = async (adId) => {
  const deletedAd = await Ads.findOneAndDelete({ _id: adId })
  if (deletedAd !== null) {
    return deletedAd._id
  }
  throw new ValidationError(DICTIONARY.validationErrors.adNotFound)
}
