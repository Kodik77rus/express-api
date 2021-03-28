const axios = require('axios')
const { getAd, getAds, createAd } = require('../../services/ad')

jest.mock('axios')

describe('post /ad', () => {
  const testAd = {
    "title": "crutches",
    "description": "slightly worn but in good condition",
    "price": "77",
    "imgURLs": ["https://mainImg", "https://secondImg", "https://thirdImg"]
  }

  it('creates ad', async () => {
    const res = await axios.get('/api/ads?page=1&sort=byPriceAsс')
    expect(res.statusCode).toBe(200)
  })

})
