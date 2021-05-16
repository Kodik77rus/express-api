// const { PARSED_OBJECTS } = require('../../constants')
// const {
//   shemaArrayValidator,
//   shemaUrlValidator,
//   querySortValidator,
//   queryAdValidator,
// } = require('../../utils')


// describe('Schema arrays validations functions', () => {
//   const testArrays = {
//     first: [],
//     second: [2, 3, 4, 5],
//     third: ['sample_1', 'sample_2', 'sample_3', 'sample_4'],
//     fourth: ['sample_1', 'sample_2', 'sample_3'],
//     fifth: ['https://sample_1', 'https://sample_2'],
//   }

//   test('it should not be empty array', () => {
//     expect(shemaArrayValidator(testArrays.first)).toBeFalsy()
//   })

//   test('it should be array of strings', () => {
//     expect(shemaArrayValidator(testArrays.second)).toBeFalsy()
//   })

//   test('it should be array with min 1, max 3 length', () => {
//     expect(shemaArrayValidator(testArrays.third)).toBeFalsy()
//   })

//   test('each element of array should be url link which contains http/https', () => {
//     expect(shemaArrayValidator(testArrays.fourth)).toBeTruthy()
//     expect(shemaUrlValidator(testArrays.fourth)).toBeFalsy()
//   })

//   test('it should be valid array', () => {
//     expect(shemaArrayValidator(testArrays.fifth)).toBeTruthy()
//     expect(shemaUrlValidator(testArrays.fifth)).toBeTruthy()
//   })
// })

// describe('Validation for GET /ads endpoint', () => {
//   const testQueries = {
//     first: { test_1: 2, test_2: 'test' },
//     second: { page: 2, sort: 54 },
//     third: { page: '-1', sort: 'test_1,test_2' },
//     fourth: { page: '2', sort: 'byPriceDesc,byDateAsc,byDateAsc' },
//     fifth: { page: '1', sort: 'byDateAsc' },
//     fifth_2: { page: '1', sort: 'byDateAsc,byDateAsc' },
//     sixth: { page: '1', sort: 'byPriceAsc' },
//     sixth_2: { page: '1', sort: 'byPriceAsc' },
//     seventh: { page: '1', sort: 'byDateDesc' },
//     eighth: { page: '1', sort: 'byPriceDesc' },
//     ninth: { page: '1', sort: 'byPriceDesc,byDateDesc' },
//     tenth: { page: '1', sort: 'byPriceAsc,byDateAsc' },
//     eleventh: { page: '1', sort: 'byPriceAsc,byDateDesc' },
//     twelfth: { page: '1', sort: 'byPriceDesc,byDateAsc' },
//   }

//   const testRes = {
//     fifthRes: { date: 1 },
//     sixthRes: { price: 1 },
//     seventhRes: { date: - 1 },
//     eighthRes: { price: -1 },
//     ninthRes: { price: -1, date: -1 },
//     tenthRes: { price: 1, date: 1 },
//     eleventhRes: { price: 1, date: -1 },
//     twelfthRes: { price: -1, date: 1 },
//   }

//   test('it should contains keys: page,sort', () => {
//     expect(querySortValidator(testQueries.first)).toBeFalsy()
//   })

//   test('values should be strings', () => {
//     expect(querySortValidator(testQueries.second)).toBeFalsy()
//   })

//   test('page must be > 0; params in key sort must be: byPriceAsc, byPriceDesc, byDateAsc, byDateDesc', () => {
//     expect(querySortValidator(testQueries.third)).toBeFalsy()
//   })

//   test('params (min 1, max 2) in key (sort)', () => {
//     expect(querySortValidator(testQueries.fourth)).toBeFalsy()
//   })

//   test('it should be validated 1', () => {
//     expect(querySortValidator(testQueries.fifth)).toEqual(testRes.fifthRes)
//   })

//   test('it should be validated 1.1 (if sort fields duplicates func takes first of them)', () => {
//     expect(querySortValidator(testQueries.fifth_2)).toEqual(testRes.fifthRes)
//   })

//   test('it should be validated 2', () => {
//     expect(querySortValidator(testQueries.sixth)).toEqual(testRes.sixthRes)
//   })

//   test('it should be validated 2.1 (if sort fields duplicates func takes first of them)', () => {
//     expect(querySortValidator(testQueries.sixth_2)).toEqual(testRes.sixthRes)
//   })

//   test('it should be validated 3', () => {
//     expect(querySortValidator(testQueries.seventh)).toEqual(testRes.seventhRes)
//   })

//   test('it should be validated 4', () => {
//     expect(querySortValidator(testQueries.eighth)).toEqual(testRes.eighthRes)
//   })

//   test('it should be validated 5', () => {
//     expect(querySortValidator(testQueries.ninth)).toEqual(testRes.ninthRes)
//   })

//   test('it should be validated 6', () => {
//     expect(querySortValidator(testQueries.tenth)).toEqual(testRes.tenthRes)
//   })

//   test('it should be validated 7', () => {
//     expect(querySortValidator(testQueries.eighth)).toEqual(testRes.eighthRes)
//   })

//   test('it should be validated 8', () => {
//     expect(querySortValidator(testQueries.twelfth)).toEqual(testRes.twelfthRes)
//   })
// })

// describe('Validation for GET /ad endpoint', () => {
//   const testQueries = {
//     first: 54,
//     second: 'test',
//     third: 'imgURLs,description,imgURLs',
//     fourth: 'imgURLs,description',
//     fifth: 'description',
//     fifth_2: 'description,description',
//     sixth: 'imgURLs',
//     sixth_2: 'imgURLs,imgURLs',
//   }

//   test('it should be a strings', () => {
//     expect(queryAdValidator(testQueries.first)).toBeFalsy()
//   })

//   test('it should contains imgURLs,description or one of them', () => {
//     expect(queryAdValidator(testQueries.second)).toBeFalsy()
//   })

//   test('field should contains min 1, max 2 value', () => {
//     expect(queryAdValidator(testQueries.third)).toBeFalsy()
//   })

//   test('it should be validated 1', () => {
//     expect(queryAdValidator(testQueries.fourth)).toEqual(PARSED_OBJECTS.withTwoParams)
//   })

//   test('it should be validated 2', () => {
//     expect(queryAdValidator(testQueries.fifth)).toEqual(PARSED_OBJECTS.withDescription)
//   })

//   test('it should be validated 2.1 (if fields duplicates func takes first of them)', () => {
//     expect(queryAdValidator(testQueries.fifth_2)).toEqual(PARSED_OBJECTS.withDescription)
//   })

//   test('it should be validated 3', () => {
//     expect(queryAdValidator(testQueries.sixth)).toEqual(PARSED_OBJECTS.withImgURLs)
//   })

//   test('it should be validated 3.1 (if fields duplicates func takes first of them)', () => {
//     expect(queryAdValidator(testQueries.sixth_2)).toEqual(PARSED_OBJECTS.withImgURLs)
//   })
// })
