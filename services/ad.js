const Ads = require('../model/ad')
const { querySortValidator, queryAdValidator, updateAdlidator } = require('../utils')
const { PAGE_SIZE, DICTIONARY, PARSED_OBJECTS } = require('../constants')

exports.getAd = async (adId, query) => {
  try {
    if (Object.keys(query).length === 0) {
      const ad = await Ads.findById(adId, PARSED_OBJECTS.withoutParams)
      return ad
    } else if (query.fields && Object.keys(query).length === 1) {
      const isValid = queryAdValidator(query.fields)
      if (isValid) {
        return await Ads.findById(adId, isValid)
      } else {
        throw new Error(DICTIONARY.errors.badRequest)
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
    const isValid = querySortValidator(query)
    if (isValid) {
      return await Ads.find({}, PARSED_OBJECTS.withoutParams)
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
    const isValid = updateAdlidator(body)
    if (isValid) {
      return await Ads.findOneAndUpdate({ _id: adId }, body, { new: true })
    } else {
      throw new Error(DICTIONARY.errors.badRequest)
    }
  } catch (err) {
    return err
  }
}

exports.deleteAd = async adId => {
  try {
    const deleteAd = await Ads.findOneAndDelete({ _id: adId })
    if (deleteAd === null) {
      throw new Error('Ad not exist')
    }
    return deleteAd
  } catch (err) {
    return err
  }
}
