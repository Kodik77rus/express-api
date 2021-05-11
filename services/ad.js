const mongoose = require('mongoose')
const moment = require('moment')

const Ads = require('../model/ad')
const {
  ValidationError,
  queryAdValidator,
  querySortValidator,
  updateAdlidator,
} = require('../utils')
const {
  PAGE_SIZE,
  DICTIONARY,
  PARSED_OBJECTS,
  DATE_FORMAT,
} = require('../constants')

exports.getAd = async (adId, query) => {
  try {
    if (Object.keys(query).length === 0 && adId) {
      if (mongoose.Types.ObjectId.isValid(adId)) {
        const ad = await Ads.findById(adId, PARSED_OBJECTS.withoutParams)
        if (ad !== null) { return ad }
        else { throw new ValidationError(DICTIONARY.errors.adNotFound) }
      } else { throw new ValidationError(DICTIONARY.errors.badId) }
    } else if (query.fields && adId && Object.keys(query).length === 1) {
      if (mongoose.Types.ObjectId.isValid(adId)) {
        const isValid = queryAdValidator(query.fields)
        if (isValid) {
          const ad = await Ads.findById(adId, isValid)
          if (ad !== null) { return ad }
          else { throw new ValidationError(DICTIONARY.errors.adNotFound) }
        } else { throw new ValidationError(DICTIONARY.errors.badFields) }
      } else { throw new ValidationError(DICTIONARY.errors.badId) }
    } else { throw new ValidationError(DICTIONARY.errors.badRequest) }
  } catch (err) {
    throw err
  }
}

exports.getAds = async query => {
  try {
    if (Object.keys(query).length === 2 && query.sort && query.page) {
      if (+query.page > 0) {
        const isValid = querySortValidator(query)
        if (isValid && isValid.hasOwnProperty('date')) {
          const ads = await Ads
            .find({}, PARSED_OBJECTS.withDate)
            .skip(PAGE_SIZE * (query.page - 1))
            .limit(PAGE_SIZE)
            .sort(isValid)
          if (ads.length > 0) {
            return ads.map(a => ({
              title: a.title,
              price: a.price,
              mainUrl: a.mainUrl,
              date: moment(a.date).format(DATE_FORMAT),
            }))
          } else { throw new ValidationError(DICTIONARY.errors.noContentOnPage) }
        } else if (isValid) {
          const ads = await Ads
            .find({}, PARSED_OBJECTS.withoutParams)
            .skip(PAGE_SIZE * (query.page - 1))
            .limit(PAGE_SIZE)
            .sort(isValid)
          if (ads.length > 0) { return ads }
          else { throw new ValidationError(DICTIONARY.errors.noContentOnPage) }
        } else { throw new ValidationError(DICTIONARY.errors.badSortFields) }
      } else { throw new ValidationError(DICTIONARY.errors.badPage) }
    } else { throw new ValidationError(DICTIONARY.errors.badRequest) }
  } catch (err) {
    throw err
  }
}

exports.createAd = async ad => {
  try {
    const createdAd = await new Ads(ad).save()
    return createdAd._id
  } catch (err) {
    throw err
  }
}

exports.updateAd = async (adId, body) => {
  try {
    if (mongoose.Types.ObjectId.isValid(adId)) {
      const isValid = updateAdlidator(body)
      if (isValid) {
        const newAd = await Ads.findOneAndUpdate({ _id: adId }, body, { new: true })
        if (newAd !== null) { return newAd }
        else { throw new ValidationError(DICTIONARY.errors.adNotFound) }
      } else { throw new ValidationError(DICTIONARY.errors.badBody) }
    } else { throw new ValidationError(DICTIONARY.errors.badId) }
  } catch (err) {
    throw err
  }
}

exports.deleteAd = async adId => {
  try {
    if (mongoose.Types.ObjectId.isValid(adId)) {
      const deleteAd = await Ads.findOneAndDelete({ _id: adId })
      if (deleteAd !== null) { return deleteAd._id }
      else { throw new ValidationError(DICTIONARY.errors.adNotFound) }
    } else { throw new ValidationError(DICTIONARY.errors.badId) }
  } catch (err) {
    throw err
  }
}
