const moment = require('moment')
const mongoose = require('mongoose')

const Ads = require('../model/ad')
const { querySortValidator, queryAdValidator, updateAdlidator } = require('../utils')
const { PAGE_SIZE, DICTIONARY, PARSED_OBJECTS, DATE_FORMAT } = require('../constants')

exports.getAd = async (adId, query) => {
  try {
    if (Object.keys(query).length === 0 && adId) {
      if (mongoose.Types.ObjectId.isValid(adId)) {
        const ad = await Ads.findById(adId, PARSED_OBJECTS.withoutParams)
        if (ad === null) {
          throw new Error(DICTIONARY.errors.adNotFound)
        } else {
          return ad
        }
      } else {
        throw new Error(DICTIONARY.errors.badId)
      }
    } else if (query.fields && adId && Object.keys(query).length === 1) {
      if (mongoose.Types.ObjectId.isValid(adId)) {
        const isValid = queryAdValidator(query.fields)
        if (isValid) {
          const ad = await Ads.findById(adId, isValid)
          if (ad === null) {
            throw new Error(DICTIONARY.errors.adNotFound)
          } else {
            return ad
          }
        } else {
          throw new Error(DICTIONARY.errors.badFields)
        }
      } else {
        throw new Error(DICTIONARY.errors.badId)
      }
    } else {
      throw new Error(DICTIONARY.errors.badRequest)
    }
  } catch (err) {
    return err
  }
}

exports.getAds = async query => {
  try {
    if (Object.keys(query).length === 2 && query.sort && query.page) {
      const isValid = querySortValidator(query)
      if (isValid && isValid.hasOwnProperty('date')) {
        const ads = await Ads
          .find({}, PARSED_OBJECTS.withDate)
          .skip(PAGE_SIZE * (query.page - 1))
          .limit(PAGE_SIZE)
          .sort(isValid)
        return ads.map(a => ({
          title: a.title,
          price: a.price,
          mainUrl: a.mainUrl,
          date: moment(a.date).format(DATE_FORMAT)
        }))
      } else if (isValid) {
        return await Ads
          .find({}, PARSED_OBJECTS.withoutParams)
          .skip(PAGE_SIZE * (query.page - 1))
          .limit(PAGE_SIZE)
          .sort(isValid)
      } else {
        throw new Error(DICTIONARY.errors.badSortFields)
      }
    } else {
      throw new Error(DICTIONARY.errors.badRequest)
    }
  } catch (err) {
    return err
  }
}

exports.createAd = async ad => {
  try {
    const postedAd = await new Ads(ad).save()
    return postedAd
  } catch (err) {
    return err
  }
}

exports.updateAd = async (adId, body) => {
  try {
    if (mongoose.Types.ObjectId.isValid(adId)) {
      const isValid = updateAdlidator(body)
      if (isValid) {
        const newAd = await Ads.findOneAndUpdate({ _id: adId }, body, { new: true })
        if (newAd === null) {
          throw new Error(DICTIONARY.errors.adNotFound)
        } else {
          return newAd
        }
      } else {
        throw new Error(DICTIONARY.errors.badBody)
      }
    } else {
      throw new Error(DICTIONARY.errors.badId)
    }
  } catch (err) {
    return err
  }
}

exports.deleteAd = async adId => {
  try {
    if (mongoose.Types.ObjectId.isValid(adId)) {
      const deleteAd = await Ads.findOneAndDelete({ _id: adId })
      if (deleteAd === null) {
        throw new Error(DICTIONARY.errors.adNotFound)
      }
      return deleteAd
    } else {
      throw new Error(DICTIONARY.errors.badId)
    }
  } catch (err) {
    return err
  }
}
