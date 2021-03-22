# firstApi

This is pet service for storing and submitting ads.

## Navigation
- [firstApi](#firstapi)
  - [Navigation](#navigation)
  - [Overview <a name="overview"></a>](#overview-)
  - [About stack <a name="about-stack"></a>](#about-stack-)
    - [This project based on: <a name="this-project-based-on"></a>](#this-project-based-on-)
    - [NPM modules used: <a name="npm-modules-used"></a>](#npm-modules-used-)
    - [MongoDB schema: <a name="mongodb-schema"></a>](#mongodb-schema-)
  - [API Methods <a name="api-methods"></a>](#api-methods-)
    - [POST Ad <a name="ad post-ad"></a>](#post-ad-)
      - [_Arguments_:](#arguments)
      - [_Example_:](#example)
      - [POST `api/ad`](#post-apiad)
    - [GET Ad <a name="get-ad"></a>](#get-ad-)
      - [_Arguments_:](#arguments-1)
      - [_Examples_:](#examples)
      - [1. GET `/api/ad/604a990f7c6dba`](#1-get-apiad604a990f7c6dba)
      - [2. GET `/api/ad/604a990f7c6dba?fields=imgURLs`](#2-get-apiad604a990f7c6dbafieldsimgurls)
      - [3. GET `/api/ad/604a990f7c6dba?fields=description`](#3-get-apiad604a990f7c6dbafieldsdescription)
      - [4. GET `/api/ad/604a990f7c6dba?fields=imgURLs,description`](#4-get-apiad604a990f7c6dbafieldsimgurlsdescription)
    - [GET Ads <a name="get-ads"></a>](#get-ads-)
      - [_Arguments_:](#arguments-2)
      - [_Examples_:](#examples-1)
      - [1. GET `/api/ads?page=1&sort=byPriceAsс`](#1-get-apiadspage1sortbypriceasс)
      - [2. GET `/api/ads?page=2&sort=byPriceDesc,byDateAsc`](#2-get-apiadspage2sortbypricedescbydateasc)

## Overview <a name="overview"></a>

This is my implementation of this [task](https://github.com/avito-tech/adv-backend-trainee-assignment/blob/main/README.md).
The API is organized around REST. API has predictable resource-oriented URLs, all endpoints are validated and returns JSON-responses, uses standard HTTP response codes.

## About stack <a name="about-stack"></a>

### This project based on: <a name="this-project-based-on"></a>

-   MongoDB
-   NodeJS

### NPM modules used: <a name="npm-modules-used"></a>
-   Axios
-   ExpressJS
-   Jest
-   Mongoose
-   Nodemon

### MongoDB schema: <a name="mongodb-schema"></a> 

```js
// defines the metadata of the schema model -
// its properties, data types and validation

const ad = new Schema({
  title: {
    type: String,
    maxlength: 200,
    required: [true, DICTIONARY.schema.title]
  },
  description: {
    type: String,
    maxlength: 1000,
    required: [true, DICTIONARY.schema.description]
  },
  price: {
    type: Number,
    min: 0,
    required: [true, DICTIONARY.schema.price]
  },
  date: {
    type: Date,
    default: Date.now
  },
  imgURLs: {
    type: [String],
    validate: {
      validator: shemaArrayValidator,
      message: DICTIONARY.schema.imgURLs
    }
  }
})
```

## API Methods <a name="api-methods"></a>

### POST Ad <a name="ad post-ad"></a>

This method takes: title, description, links images, price, and returns the ID of the created ad and \
response status code.

#### _Arguments_:

| Request Body    |        type        | description       | validation                                                                    | require |
| --------------- | :----------------: | ----------------- | ----------------------------------------------------------------------------- | :-----: |
| **title**       |      `string`      | name of ad        | max length 200 symbols                                                        | `true`  |
| **description** |      `string`      | description of ad | max length 1000 symbols                                                       | `true`  |
| **price**       |      `number`      | price of ad       | price > 0                                                                     | `true`  |
| **imgURLs**     | `Array of strings` | image of ad       | min 1 link, max 3 links, each of image <br /> must contains http/https method | `true`  |

>Automatically creates an id and date in ISO 8601 format.

#### _Example_:

#### POST `api/ad`

```json
{
  "title":"crutches",
  "description":"slightly worn but in good condition",
  "price":"77",
  "imgURLs": ["https://mainImg","https://secondImg","https://thirdImg"]
}
```

returns response satus code 201, and a json object which contains an id of created ad.

```json
{
  "id": "6057aa5592b1fc1f986261b1"
}
```

### GET Ad <a name="get-ad"></a>

This method takes the ad ID as a required parametr and returns: ad name, price, link to the main photo.\
Optional fields (you can request them by passing the fields parameter): description, links to all photos.

#### _Arguments_:

| Parameters                                |   type   | description                            | require |
| ----------------------------------------- | :------: | -------------------------------------- | :-----: |
| ***Required request parameter***          |          |                                        |         |
| **id**                                    | `string` | uniq param for ad                      | `true`  |
| ***Additional query fields parameters:*** |
| **fields="description"**                  | `string` | description of ad                      | `false` |
| **fields="imgURLs"**                      | `string` | all image of ad                        | `false` |
| **fields="imgURLs,description"**          | `string` | all image of ad <br /> and description | `false` |

>position of the attributes passed in the `fields` is not important

#### _Examples_:

#### 1. GET `/api/ad/604a990f7c6dba`

returns response satus code 200, and a json object which contains a title, price, and main image url of ad.

```json
{
  "title": "crutches",
  "price": 78,
  "mainUrl": "https://mainImg"
}
```

#### 2. GET `/api/ad/604a990f7c6dba?fields=imgURLs`

returns response satus code 200, and a json object which contains a title, price, and all images urls of ad.

```json
{
  "imgURLs": [
    "https://mainImg",
    "https://secondImg",
    "https://thirdImg"
  ],
  "title": "crutches",
  "price": 78
}
```

#### 3. GET `/api/ad/604a990f7c6dba?fields=description`

returns response satus code 200, and a json object which contains a title, price and description of ad.

```json
{
  "title": "crutches",
  "description": "slightly worn but in good condition",
  "price": 78
}
```

#### 4. GET `/api/ad/604a990f7c6dba?fields=imgURLs,description`

returns response satus code 200, and a json object which contains a title, price, description and all images urls of ad.

```json
{
  "imgURLs": [
      "https://mainImg",
      "https://secondImg",
      "https://thirdImg"
  ],
  "title": "crutches",
  "description": "slightly worn but in good condition",
  "price": 78
}
```

### GET Ads <a name="get-ads"></a>

This method has pagination: there are 10 ads on one page;\
It also sorts: by price (ascending / descending) and by creation date (ascending/descending);\
And returns: response satus code 200 and json object with fields: ad name, link to the main image (first in the list), price.

#### _Arguments_:

| Query  parameters                 |   type   | description                                           | require |
| --------------------------------- | :------: | ----------------------------------------------------- | :-----: |
| ***Required parameters:***        |          |                                                       |         |
| **page**                          | `string` | number of  page                                       | `true`  |
| ***One of these parameters:***    |          |                                                       |         |
| **sort="byPriceAsс"**             | `string` | sorts by price ascending                              | `true`  |
| **sort="byDateAsc"**              | `string` | sorts by date ascending                               | `true`  |
| **sort="byPriceDesc"**            | `string` | sorts by price descending                             | `true`  |
| **sort="byDateDesc"**             | `string` | sorts by date  descending                             | `true`  |
| ***Additional parameters:***      |          |                                                       |         |
| **sort="byPriceAsс,byDateAsc"**   | `string` | sorts by price ascendin and<br />by date ascending    | `false` |
| **sort="byPriceDesc,byDateDesc"** | `string` | sorts by price descending and<br />by date descending | `false` |
| **sort="byPriceAsс,byDateDesc"**  | `string` | sorts by price ascendin and<br />by date descending   | `false` |
| **sort="byPriceDesc,byDateAsc"**  | `string` | sorts by price descending and<br />by date ascending  | `false` |

>position of the attributes passed in the query request is not important.

#### _Examples_:

#### 1. GET `/api/ads?page=1&sort=byPriceAsс`

returns response satus code 200, and page (sortred array of object by price ascendin) max ads on one page 10, <br /> each object has contains a title, price, link to the main image (first in the list) of ad.

```json
[
  {
    "title": "title_7",
    "price": 9,
    "mainUrl": "https://mainImg"
  },
  {
    "title": "crutches",
    "price": 77,
    "mainUrl": "https://mainImg"
  },
  {
    "title": "crutches",
    "price": 77,
    "mainUrl": "https://mainImg"
  },
  {
    "title": "crutches",
    "price": 78,
    "mainUrl": "https://mainImg"
  },
  {
    "title": "title_5",
    "price": 123,
    "mainUrl": "https://mainImg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 567,
    "mainUrl": "http://dfgdsfgdsfg"
  },
///and other 4
]
```

#### 2. GET `/api/ads?page=2&sort=byPriceDesc,byDateAsc`

return 

```json
[
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 677,
    "mainUrl": "https://tasha"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 677,
    "mainUrl": "https://tasha"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 677,
    "mainUrl": "http://dfgdsfgdsfg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
      "price": 567,
      "mainUrl": "http://dfgdsfgdsfg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 567,
    "mainUrl": "http://dfgdsfgdsfg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 567,
    "mainUrl": "http://dfgdsfgdsfg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 567,
    "mainUrl": "http://dfgdsfgdsfg"
  },
  {
    "title": "[pergggggggggggggggggggggggggty",
    "price": 567,
    "mainUrl": "http://dfgdsfgdsfg"
  },

  //and other 2
```
