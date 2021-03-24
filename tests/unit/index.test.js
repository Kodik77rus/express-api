const {
  shemaArrayValidator,
  shemaUrlValidator,
  querySortValidator,
  queryAdValidator
} = require('../../utils')

describe('Schema arrays validations functions', () => {
  const testArrays = {
    first: [],
    second: [2, 3, 4, 5],
    third: ['sample_1', 'sample_2', 'sample_3', 'sample_4'],
    fourth: ['sample_1', 'sample_2', 'sample_3'],
    fifth: ['https://sample_1', 'https://sample_2']
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

describe('Validation  for GET /ads endpoint', () => {
  const testQueries = {
    first: { test_1: 2, test_2: 'test' },
    second: { page: 2, sort: 54 },
    third: { page: '-1', sort: 'byPriceDesc,byDateAsc' },
    fourth: { page: '2', sort: 'test_1,test_2' },
    fifth: { page: '2', sort: 'byDateAsc,byDateAsc' },
    sixth: { page: '1', sort: 'byPriceDesc,byDateAsc' }
  }

  const sixthRez = { price: -1, date: 1 }

  test('it should contains keys: page,sort', () => {
    expect(querySortValidator(testQueries.first)).toBeFalsy()
  })

  test('values should be strings', () => {
    expect(querySortValidator(testQueries.second)).toBeFalsy()
  })

  test('page must be > 0', () => {
    expect(querySortValidator(testQueries.third)).toBeFalsy()
  })

  test('params (require min 1; max 2) in key sort must be: byPriceAsc, byPriceDesc, byDateAsc, byDateDesc', () => {
    expect(querySortValidator(testQueries.fourth)).toBeFalsy()
  })

  test('params in key (sort) must be different', () => {
    expect(querySortValidator(testQueries.fifth)).toBeFalsy()
  })

  test('it should be validated', () => {
    expect(querySortValidator(testQueries.sixth)).toEqual(sixthRez)
  })
})

describe('Validation for GET /ad endpoint', () => {
  const testQueries = {
    first: { test_1: 2, test_2: 'test' },
    second: { id: 2, fields: 54 },
    third: { id: '604a990f7c6dba', fields: 'test_2,test_1' },
    fourth: { id: '604a990f7c6dba', fields: 'imgURLs,imgURLs' },
    fifth: { id: '604a990f7c6dba', fields: 'imgURLs,description' },
    sixth: { page: '1', sort: 'byPriceDesc,byDateAsc' }
  }

  const sixthRez = {
    title: 1,
    price: 1,
    description: 1,
    imgURLs: 1,
    _id: 0
  }

  test('it should be contains keys: id as required; optionally fields', () => {
    expect(queryAdValidator(testQueries.first)).toBeFalsy()
  })

  test('keys should a strings', () => {
    expect(queryAdValidator(testQueries.second)).toBeFalsy()
  })

  test('fields should contains imgURLs,description or one of them', () => {
    expect(queryAdValidator(testQueries.third)).toBeFalsy()
  })

  test('field should contains different values', () => {
    expect(queryAdValidator(testQueries.fourth)).toBeFalsy()
  })

  test('it should be validated', () => {
    expect(queryAdValidator(testQueries.fifth)).toEqual(sixthRez)
  })
})
