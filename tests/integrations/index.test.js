const request = require('supertest')

const { DICTIONARY } = require('../../constants/index')
const app = require('../../index')

const urlPrefix = '/api'

let adId = ''

testAd = {
  title: 'test',
  description: 'test',
  price: 1020,
  imgURLs: ['https://mainImg', 'https://secondImg', 'https://thirdImg']
}

const sortsTestQueries = (sortBy, params) => {
  if (sortBy === 'ByPriceAsc') { return params.sort((a, b) => a.price - b.price) }
  else if (sortBy === 'ByPriceDesc') { return params.sort((a, b) => b.price - a.price) }
  else if (sortBy === 'ByDateAsc') { return params.sort((a, b) => new Date(a.date) - new Date(b.date)) }
  else if (sortBy === 'ByDateDesc') { return params.sort((a, b) => new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceAsc,byDateAsc') { return params.sort((a, b) => a.price - b.price || new Date(a.date) - new Date(b.date)) }
  else if (sortBy === 'byPriceDesc,byDateDesc') { return params.sort((a, b) => b.price - a.price || new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceAsc,byDateDesc') { return params.sort((a, b) => a.price - b.price || new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceDesc,byDateAsc') { return params.sort((a, b) => b.price - a.price || new Date(a.date) - new Date(b.date)) }
}

const sort = (sortBy, params) => {
  if (sortBy === 'ByPriceAsc') { return params.sort((a, b) => a.price - b.price) }
  else if (sortBy === 'ByPriceDesc') { return params.sort((a, b) => b.price - a.price) }
  else if (sortBy === 'ByDateAsc') { return params.sort((a, b) => new Date(a.date) - new Date(b.date)) }
  else if (sortBy === 'ByDateDesc') { return params.sort((a, b) => new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceAsc,byDateAsc') { return params.sort((a, b) => a.price - b.price || new Date(a.date) - new Date(b.date)) }
  else if (sortBy === 'byPriceDesc,byDateDesc') { return params.sort((a, b) => b.price - a.price || new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceAsc,byDateDesc') { return params.sort((a, b) => a.price - b.price || new Date(b.date) - new Date(a.date)) }
  else if (sortBy === 'byPriceDesc,byDateAsc') { return params.sort((a, b) => b.price - a.price || new Date(a.date) - new Date(b.date)) }
}


describe('POST /users should be valid', () => {
  it('it should create an ad', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send(testAd)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
          })
        )
        adId = res.body.id
        done()
      })
  })

  it('Request with empty body', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining(`${'Ads validation failed: ' +
          'price: ' + DICTIONARY.schema.price + ', ' +
          'description: ' + DICTIONARY.schema.description + ', ' +
          'title: ' + DICTIONARY.schema.title + ', ' +
          'imgURLs: ' + DICTIONARY.schema.imgURLs
          }`))
        done()
      })
  })

  it('Request without title', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send({
        description: 'test',
        price: 9098,
        imgURLs: ['https://mainImg', 'https://secondImg', 'https://thirdImg']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining('Ads validation failed: title: ' + DICTIONARY.schema.title))
        done()
      })
  })

  it('Request without description', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send({
        title: 'test',
        price: 9098,
        imgURLs: ['https://mainImg', 'https://secondImg', 'https://thirdImg']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining('Ads validation failed: description: ' + DICTIONARY.schema.description))
        done()
      })
  })

  it('Request without price', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send({
        title: 'test',
        description: 'test',
        imgURLs: ['https://mainImg', 'https://secondImg', 'https://thirdImg']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining('Ads validation failed: price: ' + DICTIONARY.schema.price))
        done()
      })
  })

  it('Request without imgURLs', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send({
        title: 'test',
        description: 'test',
        price: 9098
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining('Ads validation failed: imgURLs: ' + DICTIONARY.schema.imgURLs))
        done()
      })
  })

  it('Request with bad array values', (done) => {
    request(app)
      .post(`${urlPrefix}/ad`)
      .send({
        title: 'test',
        description: 'test',
        price: 9098,
        imgURLs: ['mainImg', 'secondImg', 'thirdImg']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual(expect.stringContaining('Ads validation failed: imgURLs: ' + DICTIONARY.schema.validationUrl))
        done()
      })
  })
})

describe('GET Ad', () => {
  it('GET /ad:id should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/${adId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.title).toEqual(testAd.title)
        expect(res.body.price).toEqual(testAd.price)
        expect(res.body.mainUrl).toEqual('https://mainImg')
        done()
      })
  })

  it('GET /ad:id with not exist in db id (ObjectId)', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/6057aa5592b1fc1f986261b1`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Ad Not Found')
        done()
      })
  })

  it('GET /ad:id with invalid id (not ObjectId)', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/fdghdfh1`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Bad ID')
        done()
      })
  })

  it('GET /ad:id?fields=description should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/${adId}?fields=description`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.title).toEqual(testAd.title)
        expect(res.body.price).toEqual(testAd.price)
        expect(res.body.mainUrl).toEqual('https://mainImg')
        expect(res.body.description).toEqual(testAd.description)
        done()
      })
  })

  it('GET /ad:id?fields=imgURLs should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/${adId}?fields=imgURLs`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.title).toEqual(testAd.title)
        expect(res.body.price).toEqual(testAd.price)
        expect(res.body.imgURLs).toEqual(['https://mainImg', 'https://secondImg', 'https://thirdImg'])
        done()
      })
  })

  it('GET /ad:id?fields=imgURLs,description should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/${adId}?fields=imgURLs,description`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.title).toEqual(testAd.title)
        expect(res.body.price).toEqual(testAd.price)
        expect(res.body.description).toEqual(testAd.description)
        expect(res.body.imgURLs).toEqual(['https://mainImg', 'https://secondImg', 'https://thirdImg'])
        done()
      })
  })

  it('GET /ad:id?fields with invalid fields', (done) => {
    request(app)
      .get(`${urlPrefix}/ad/${adId}?fields=test,test_2`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Bad Fields')
        done()
      })
  })
})

describe('GET Ads', () => {
  it('GET /ads?page=1&sort=byPriceAsc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceAsc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => obj.price)).toEqual(
          [...res.body].sort((a, b) => a.price - b.price).map(obj => obj.price)
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byDateAsc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byDateAsc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => obj.date)).toEqual(
          [...res.body].sort((a, b) => new Date(a.date) - new Date(b.date)).map(obj => obj.date)
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byPriceDesc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceDesc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => obj.price)).toEqual(
          [...res.body].sort((a, b) => b.price - a.price).map(obj => obj.price)
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byDateDesc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byDateDesc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => obj.date)).toEqual(
          [...res.body].sort((a, b) => new Date(b.date) - new Date(a.date)).map(obj => obj.date)
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byPriceAsc,byDateAsc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceAsc,byDateAsc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => ({ date: obj.date, price: obj.price }))).toEqual(
          [...res.body].sort((a, b) => a.price - b.price || new Date(a.date) - new Date(b.date)).map(obj => ({date: obj.date, price: obj.price}))
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byPriceDesc,byDateDesc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceDesc,byDateDesc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => ({ date: obj.date, price: obj.price }))).toEqual(
          [...res.body].sort((a, b) => b.price - a.price || new Date(b.date) - new Date(a.date)).map(obj => ({date: obj.date, price: obj.price}))
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byPriceAsc,byDateDesc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceAsc,byDateDesc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => ({ date: obj.date, price: obj.price }))).toEqual(
          [...res.body].sort((a, b) => a.price - b.price || new Date(b.date) - new Date(a.date)).map(obj => ({date: obj.date, price: obj.price}))
        )
      })
    done()
  })

  it('GET /ads?page=1&sort=byPriceDesc,byDateAsc should be valid', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=byPriceDesc,byDateAsc`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body).toHaveLength(10)
        expect(res.body.map(obj => ({ date: obj.date, price: obj.price }))).toEqual(
          [...res.body].sort((a, b) => b.price - a.price || new Date(a.date) - new Date(b.date)).map(obj => ({date: obj.date, price: obj.price}))
        )
      })
    done()
  })

  it('GET /ads test with invalid sort fields', (done) => {
    request(app)
      .get(`${urlPrefix}/ads?page=1&sort=test,test`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Bad Sort Fields')
      })
    done()
  })
})

describe('PUT Ad', () => {
  it('PUT /ad:id should be valid', (done) => {
    request(app)
      .put(`${urlPrefix}/ad/${adId}`)
      .send({
        title: 'test1',
        price: 234,
        description: 'test1',
        imgURLs: ['https://test']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toEqual(
          expect.objectContaining({
            date: expect.any(String),
          })
        )
        expect(res.body.title).toEqual('test1')
        expect(res.body.price).toEqual(234)
        expect(res.body.description).toEqual('test1')
        expect(res.body.imgURLs).toEqual(['https://test'])
        expect(res.body._id).toEqual(adId)
        expect(res.body.__v).toEqual(0)
      })
    done()
  })

  it('PUT /ad:id with not exist in db id (ObjectId)', (done) => {
    request(app)
      .put(`${urlPrefix}/ad/6064a8e1f1dcab1a764e0f01`)
      .send({
        title: 'test1',
        price: 234,
        description: 'test1',
        imgURLs: ['https://test']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Ad Not Found')
        done()
      })
  })

  it('PUT /ad:id with invalid id (not ObjectId)', (done) => {
    request(app)
      .put(`${urlPrefix}/ad/aa55dsg1b1`)
      .send({
        title: 'test1',
        price: 234,
        description: 'test1',
        imgURLs: ['https://test']
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Bad ID')
        done()
      })
  })
})

describe('Delete Ad should be valid', () => {
  it('Delete /ad:id should be valid', (done) => {
    request(app)
      .delete(`${urlPrefix}/ad/${adId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.id).toEqual(adId)
        done()
      })
  })

  it('Delete /ad:id with not exist in db id (ObjectId)', (done) => {
    request(app)
      .delete(`${urlPrefix}/ad/6057aa5592b1fc1f986261b9`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Ad Not Found')
        done()
      })
  })

  it('Delete /ad:id with invalid id (not ObjectId)', (done) => {
    request(app)
      .delete(`${urlPrefix}/ad/sdfgsdfgjd`)
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.ERROR_MESSAGE).toEqual('Bad ID')
        done()
      })
  })
})