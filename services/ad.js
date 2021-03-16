const Ad = require('../model/ad')

exports.createAd = async (ad) => {
  try {
    const postedAd = await new Ad(ad).save()
    return postedAd
  } catch (err) {
    return err
  }
}

exports.getTenAd = async () => {
  //req to db
  //return 
}

exports.getOneAd = async () => {
  //req to db
  // return ad
}