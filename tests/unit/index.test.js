const { PARSED_OBJECTS, VALID_QUERY_GET_AD, VALID_QUERY_REQ_SORT } = require('../../constants')
const {
  shemaArrayValidator,
  shemaUrlValidator,
  isValidQuery,
  adParser,
  sortAdsParser
} = require('../../utils')


describe('Schema arrays validations functions', () => {
  const testArrays = {
    first: [],
    second: [2, 3, 4, 5],
    third: ['sample_1', 'sample_2', 'sample_3', 'sample_4'],
    fourth: ['sample_1', 'sample_2', 'sample_3'],
    fifth: ['https://sample_1', 'https://sample_2'],
  }

  test('it should not be empty array', () => {
    expect(shemaArrayValidator(testArrays.first)).toBeFalsy()
  })

  test('it should be array of strings', () => {
    expect(shemaArrayValidator(testArrays.second)).toBeFalsy()
  })

  test('it should be array with min 1, max 3 length', () => {
    expect(shemaArrayValidator(testArrays.third)).toBeFalsy()
  })

  test('each element of array should be url link which contains http/https', () => {
    expect(shemaArrayValidator(testArrays.fourth)).toBeTruthy()
    expect(shemaUrlValidator(testArrays.fourth)).toBeFalsy()
  })

  test('it should be valid array', () => {
    expect(shemaArrayValidator(testArrays.fifth)).toBeTruthy()
    expect(shemaUrlValidator(testArrays.fifth)).toBeTruthy()
  })
})

describe('Validation for GET /ads endpoint', () => {
  const testQueries = {
    first: 'test',
    second: 54,
    third: 'test_1,test_2',
    fourth: 'byPriceDesc,byDateAsc,byDateAsc',
    fifth: 'byDateAsc',
    sixth: 'byPriceAsc',
    seventh: 'byDateDesc',
    eighth: 'byPriceDesc',
    ninth: 'byPriceDesc,byDateDesc',
    tenth: 'byPriceAsc,byDateAsc',
    eleventh: 'byPriceAsc,byDateDesc',
    twelfth: 'byPriceDesc,byDateAsc',
  }

  parsedObj = {
    first: { //
      price: 1,
    },
    second: {
      price: -1
    },
    third: { //
      date: 1
    },
    fourth: {
      date: -1 //
    },
    fifth: {
      price: -1,
      date: -1
    },
    sixth: {
      price: 1,
      date: 1
    },
    seventh: {
      price: 1,
      date: -1
    },
    eighth: {
      price: -1,
      date: 1
    }
  }

  test('it should contains keys: page,sort', () => {
    expect(isValidQuery(testQueries.first, VALID_QUERY_REQ_SORT)).toBeFalsy()
  })

  test('values should be strings', () => {
    expect(isValidQuery(testQueries.second, VALID_QUERY_REQ_SORT)).toBeFalsy()
  })

  test('params in key sort must be: byPriceAsc, byPriceDesc, byDateAsc, byDateDesc', () => {
    expect(isValidQuery(testQueries.third, VALID_QUERY_REQ_SORT)).toBeFalsy()
  })

  test('params (min 1, max 2) in key (sort)', () => {
    expect(isValidQuery(testQueries.fourth, VALID_QUERY_REQ_SORT)).toBeFalsy()
  })

  test('it should be validated 1', () => {
    const rez = isValidQuery(testQueries.fifth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(1)
    expect(sortAdsParser(rez, testQueries.fifth)).toEqual(parsedObj.third)
  })

  test('it should be validated 2', () => {
    const rez = isValidQuery(testQueries.sixth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(1)
    expect(sortAdsParser(rez, testQueries.sixth)).toEqual(parsedObj.first)
  })

  test('it should be validated 3', () => {
    const rez = isValidQuery(testQueries.seventh, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(1)
    expect(sortAdsParser(rez, testQueries.seventh)).toEqual(parsedObj.fourth)
  })

  test('it should be validated 4', () => {
    const rez = isValidQuery(testQueries.eighth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(1)
    expect(sortAdsParser(rez, testQueries.eighth)).toEqual(parsedObj.second)
  })

  test('it should be validated 5', () => {
    const rez = isValidQuery(testQueries.ninth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(2)
    expect(sortAdsParser(rez, testQueries.ninth)).toEqual(parsedObj.fifth)
  })

  test('it should be validated 6', () => {
    const rez = isValidQuery(testQueries.tenth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(2)
    expect(sortAdsParser(rez, testQueries.tenth)).toEqual(parsedObj.sixth)
  })

  test('it should be validated 7', () => {
    const rez = isValidQuery(testQueries.eleventh, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(2)
    expect(sortAdsParser(rez, testQueries.eleventh)).toEqual(parsedObj.seventh)
  })

  test('it should be validated 8', () => {
    const rez = isValidQuery(testQueries.twelfth, VALID_QUERY_REQ_SORT)
    expect(rez).toBe(2)
    expect(sortAdsParser(rez, testQueries.twelfth)).toEqual(parsedObj.eighth)
  })
})

describe('Validation for GET /ad endpoint', () => {
  const testQueries = {
    first: 54,
    second: 'test',
    third: 'imgURLs,description,imgURLs',
    fourth: 'imgURLs,description',
    fifth: 'description',
    sixth: 'imgURLs',
  }

  test('it should be a strings', () => {
    expect(isValidQuery(testQueries.first, VALID_QUERY_GET_AD)).toBeFalsy()
  })

  test('it should contains imgURLs,description or one of them', () => {
    expect(isValidQuery(testQueries.second, VALID_QUERY_GET_AD)).toBeFalsy()
  })

  test('field should contains min 1, max 2 value', () => {
    expect(isValidQuery(testQueries.third, VALID_QUERY_GET_AD)).toBeFalsy()
  })

  test('it should be validated 1', () => {
    const rez = isValidQuery(testQueries.fourth, VALID_QUERY_GET_AD)
    expect(rez).toBe(2)
    expect(adParser(rez, testQueries.fourth)).toEqual(PARSED_OBJECTS.withTwoParams)
  })

  test('it should be validated 2', () => {
    const rez = isValidQuery(testQueries.fifth, VALID_QUERY_GET_AD)
    expect(rez).toBe(1)
    expect(adParser(rez, testQueries.fifth)).toEqual(PARSED_OBJECTS.withDescription)
  })

  test('it should be validated 3', () => {
    const rez = isValidQuery(testQueries.sixth, VALID_QUERY_GET_AD)
    expect(rez).toBe(1)
    expect(adParser(rez, testQueries.sixth)).toEqual(PARSED_OBJECTS.withImgURLs)
  })

  test('it should be validated 4 (without fields)', () => {
    expect(adParser(0)).toEqual(PARSED_OBJECTS.withoutParams)
  })
})
