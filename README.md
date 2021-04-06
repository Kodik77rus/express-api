# Navigation
- [Navigation](#navigation)
  - [firstApi](#firstapi)
  - [Overview <a name="overview"></a>](#overview-)
  - [About stack <a name="about-stack"></a>](#about-stack-)
    - [This project based on: <a name="this-project-based-on"></a>](#this-project-based-on-)
    - [NPM modules used: <a name="npm-modules-used"></a>](#npm-modules-used-)
    - [MongoDB schema: <a name="mongodb-schema"></a>](#mongodb-schema-)
    - [Docker-compose file](#docker-compose-file)
  - [Application architecture <a name="server-arc"></a>](#application-architecture-)
  - [Start project](#start-project)
  - [API Methods <a name="api-methods"></a>](#api-methods-)
    - [GET Ad <a name="get-ad"></a>](#get-ad-)
      - [Arguments:](#arguments)
      - [Errors:](#errors)
      - [Examples:](#examples)
      - [1. GET `http://localhost:3000/api/ad/604a990f7c6dba`](#1-get-httplocalhost3000apiad604a990f7c6dba)
      - [2. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=imgURLs`](#2-get-httplocalhost3000apiad604a990f7c6dbafieldsimgurls)
      - [3. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=description`](#3-get-httplocalhost3000apiad604a990f7c6dbafieldsdescription)
      - [4. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=imgURLs,description`](#4-get-httplocalhost3000apiad604a990f7c6dbafieldsimgurlsdescription)
    - [GET Ads <a name="get-ads"></a>](#get-ads-)
      - [Arguments:](#arguments-1)
      - [Errors:](#errors-1)
      - [Examples:](#examples-1)
      - [1. GET `http://localhost:3000/api/ads?page=1&sort=byPriceAsc`](#1-get-httplocalhost3000apiadspage1sortbypriceasc)
      - [2. GET `http://localhost:3000/api/ads?page=2&sort=byPriceDesc,byDateAsc`](#2-get-httplocalhost3000apiadspage2sortbypricedescbydateasc)
    - [POST Ad <a name="ad post-ad"></a>](#post-ad-)
      - [Arguments:](#arguments-2)
      - [Errors:](#errors-2)
      - [Example:](#example)
      - [POST `http://localhost:3000/api/ad`](#post-httplocalhost3000apiad)
    - [PUT Ad](#put-ad)
      - [Errors:](#errors-3)
      - [Example:](#example-1)
      - [PUT `http://localhost:3000/api/ad/6068efe540975e2e9ce9534b`](#put-httplocalhost3000apiad6068efe540975e2e9ce9534b)
    - [DELETE Ad](#delete-ad)
      - [Arguments:](#arguments-3)
      - [Errors:](#errors-4)
      - [Example:](#example-2)
      - [DELETE `http://localhost:3000/api/ad/6068efe540975e2e9ce9534b`](#delete-httplocalhost3000apiad6068efe540975e2e9ce9534b)
## firstApi

This is pet service for storing and submitting ads.

## Overview <a name="overview"></a>

This is my implementation of this [task](https://github.com/avito-tech/adv-backend-trainee-assignment/blob/main/README.md).
The API is organized around REST. API has predictable resource-oriented URLs, all endpoints are validated and returns JSON-responses, uses standard HTTP response codes.

## About stack <a name="about-stack"></a>

### This project based on: <a name="this-project-based-on"></a>

-   Docker
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

### Docker-compose file 
```docker
version: '3.4'

services:
  firstapi:
    image: firstapi
    restart: always
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
    links:
      - mongo

  mongo-express:
    image: mongo-express
    environment:
      ME_CONFIG_OPTIONS_EDITORTHEME: ambiance
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_PORT: 27017
      ME_CONFIG_MONGODB_AUTH_DATABASE: admin
    ports:
      - 8081:8081
    links:
      - mongo

  mongo:
    image: mongo
    restart: always
    ports:
      - 27018:27017
    volumes:
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
```

## Application architecture <a name="server-arc"></a>

![serverArc](./img/serverArc.svg?raw=true)

The http request is processed by the route, then it goes to its controller, then the controller sends a request to the services,<br /> then services sends a request to the database, then the controller sends a response in json format to the client.

## Start project
At first create an firstapi image by running command `docker build -t firstapi .` , then run command `docker-compose -f "docker-compose.yml" up -d --build` . The file `init-mongo.js` creates initial database, consisting of 21 documents, and also creates an admin and a database user. 

>For pretty view of database, use route `http://localhost:8081/` .

## API Methods <a name="api-methods"></a>
### GET Ad <a name="get-ad"></a>

This method takes the ad ID as a required parametr and returns: ad name, price, link to the main photo.
Optional fields (you can request them by passing the fields parameter): description, links to all photos.

#### Arguments:

| Parameters                                |   type   | description                            | require |
| ----------------------------------------- | :------: | -------------------------------------- | :-----: |
| ***Required request parameter***          |          |                                        |         |
| **id**                                    | `string` | uniq param for ad                      | `true`  |
| ***Additional query fields parameters:*** |
| **fields="description"**                  | `string` | description of ad                      | `false` |
| **fields="imgURLs"**                      | `string` | all image of ad                        | `false` |
| **fields="imgURLs,description"**          | `string` | all image of ad <br /> and description | `false` |

>Position of the attributes passed in the `fields` is not important

#### Errors:

| Parameter         |   type   |                  values                  |
| ----------------- | :------: | :--------------------------------------: |
| **ERROR_MESSAGE** | `string` | "Ad Not Found",<br/>"bad ID",<br/>"Bad Fields" |

#### Examples:

#### 1. GET `http://localhost:3000/api/ad/604a990f7c6dba`

Returns response satus code 200, and a json object which contains a title, price, and main image url of ad.

```json
{
  "title": "crutches",
  "price": 78,
  "mainUrl": "https://mainImg"
}
```

#### 2. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=imgURLs`

Returns response satus code 200, and a json object which contains a title, price, and all images urls of ad.

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

#### 3. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=description`

Returns response satus code 200, and a json object which contains a title, price and description of ad.

```json
{
  "title": "crutches",
  "description": "slightly worn but in good condition",
  "price": 78
}
```

#### 4. GET `http://localhost:3000/api/ad/604a990f7c6dba?fields=imgURLs,description`

Returns response satus code 200, and a json object which contains a title, price, description and all images urls of ad.

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

#### Arguments:

| Query  parameters                 |   type   | description                                           | require |
| --------------------------------- | :------: | ----------------------------------------------------- | :-----: |
| ***Required parameters:***        |          |                                                       |         |
| **page**                          | `string` | number of  page                                       | `true`  |
| ***One of these parameters:***    |          |                                                       |         |
| **sort="byPriceAsc"**             | `string` | sorts by price ascending                              | `true`  |
| **sort="byDateAsc"**              | `string` | sorts by date ascending                               | `true`  |
| **sort="byPriceDesc"**            | `string` | sorts by price descending                             | `true`  |
| **sort="byDateDesc"**             | `string` | sorts by date  descending                             | `true`  |
| ***Additional parameters:***      |          |                                                       |         |
| **sort="byPriceAsc,byDateAsc"**   | `string` | sorts by price ascendin and<br />by date ascending    | `false` |
| **sort="byPriceDesc,byDateDesc"** | `string` | sorts by price descending and<br />by date descending | `false` |
| **sort="byPriceAsc,byDateDesc"**  | `string` | sorts by price ascendin and<br />by date descending   | `false` |
| **sort="byPriceDesc,byDateAsc"**  | `string` | sorts by price descending and<br />by date ascending  | `false` |

>Position of the attributes passed in the query request is not important.

#### Errors:

| Parameter         |   type   |      values       |
| ----------------- | :------: | :---------------: |
| **ERROR_MESSAGE** | `string` | "Bad Sort Fields" |

#### Examples:

#### 1. GET `http://localhost:3000/api/ads?page=1&sort=byPriceAsc`

Returns response satus code 200, and page (sortred array of object by price ascendin) max ads on one page 10, <br /> each object has contains a title, price, link to the main image (first in the list) of ad. 

>If query param has `"byDate"` the date field is added to the object.

```json
[
    {
        "title": "test_6",
        "price": 77,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_1",
        "price": 77,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_8",
        "price": 77,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "crutches",
        "price": 78,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_10",
        "price": 213,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_3",
        "price": 345,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_2",
        "price": 567,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_11",
        "price": 879,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_16",
        "price": 1234,
        "mainUrl": "https://mainImg"
    },
    {
        "title": "test_18",
        "price": 2345,
        "mainUrl": "https://mainImg"
    }
]
```

#### 2. GET `http://localhost:3000/api/ads?page=2&sort=byPriceDesc,byDateAsc`

returns response satus code 200, and page (sortred array of object by price descending and by date ascending) max ads on one page 10, each object has contains a title, price, link to the main image (first in the list) of ad.

```json
[
    {
        "title": "test_18",
        "price": 2345,
        "date": "2021-04-06 12:58:54"
    },
    {
        "title": "test_19",
        "price": 2335,
        "date": "2021-04-06 12:59:10"
    },
    {
        "title": "test_11",
        "price": 879,
        "date": "2021-04-06 12:59:44"
    },
    {
        "title": "test_11",
        "price": 879,
        "date": "2021-04-06 01:00:11"
    },
    {
        "title": "test_11",
        "price": 879,
        "date": "2021-04-06 01:00:20"
    },
    {
        "title": "test_3",
        "price": 345,
        "date": "2021-04-06 01:00:40"
    },
    {
        "title": "test_10",
        "price": 345,
        "date": "2021-04-06 01:00:46"
    },
    {
        "title": "crutches",
        "price": 78,
        "date": "2021-04-06 01:00:57"
    },
    {
        "title": "test_1",
        "price": 77,
        "date": "2021-04-06 01:01:07"
    },
    {
        "title": "test_20",
        "price": 77,
        "date": "2021-04-06 01:01:55"
    }
]
```
### POST Ad <a name="ad post-ad"></a>

This method takes: title, description, links images, price, and returns the ID of the created ad and \
response status code.
#### Arguments:

| Request Body    |    type    | description       | validation                                                                    | require |
| --------------- | :--------: | ----------------- | ----------------------------------------------------------------------------- | :-----: |
| **title**       |  `string`  | name of ad        | max length 200 symbols                                                        | `true`  |
| **description** |  `string`  | description of ad | max length 1000 symbols                                                       | `true`  |
| **price**       |  `number`  | price of ad       | price > 0                                                                     | `true`  |
| **imgURLs**     | `string[]` | image of ad       | min 1 link, max 3 links, each of image <br /> must contains http/https method | `true`  |

>Automatically creates an id and date in ISO 8601 format.

#### Errors:

| Parameter         |   Type   |                                                                                                  values                                                                                                  |
| ----------------- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **ERROR_MESSAGE** | `string` | "Ad title required",<br/>"Ad description required",<br/>"Ad price required",<br/>"You must pass an array of more than 1 url and no more than 3 urls",<br/>"Invalid URL, URL must contains http or https" |

#### Example:
#### POST `http://localhost:3000/api/ad`

```json
{
  "title":"crutches",
  "description":"slightly worn but in good condition",
  "price":77,
  "imgURLs": ["https://mainImg","https://secondImg","https://thirdImg"]
}
```

Returns response satus code 201, and a json object which contains an id of created ad.

```json
{
  "id": "6057aa5592b1fc1f986261b1"
}
```

### PUT Ad

This method takes: id of Ad title as a query param and body: title, description, links images, price, and returns updated ad in JSON foramt.

| Parameter          |    Type    | Description       |                                  Validation                                   | Require |
| ------------------ | :--------: | ----------------- | :---------------------------------------------------------------------------: | :-----: |
| ***Query param***  |            |                   |                                                                               |         |
| **id**             |  `string`  | uniq param for ad |                      /^[0-9a-fA-F]{24}$/ (typeObjectId)                       | `true`  |
| ***Request Body*** |            |                   |                                                                               |         |
| **title**          |  `string`  | name of ad        |                            max length 200 symbols                             | `true`  |
| **description**    |  `string`  | description of ad |                            max length 1000 symbols                            | `true`  |
| **price**          |  `number`  | price of ad       |                                   price > 0                                   | `true`  |
| **imgURLs**        | `string[]` | image of ad       | min 1 link, max 3 links, each of image <br /> must contains http/https method | `true`  |

#### Errors:

| Parameter         |   type   |                        values                        |
| ----------------- | :------: | :--------------------------------------------------: |
| **ERROR_MESSAGE** | `string` | "Ad Not Found" ,<br/>"bad ID",</br>"Bad Body Params" |

#### Example:
#### PUT `http://localhost:3000/api/ad/6068efe540975e2e9ce9534b`

body:

```json
{
  "title":"test",
  "description":"slightly worn but in good condition",
  "price":77,
  "imgURLs": ["https://mainImg","https://test_1","https://test_2"]
}
```

Returns updated ad and response status code 200.

```json
{
  "imgURLs": [
      "https://mainImg",
      "https://test_1",
      "https://test_2"
  ],
  "_id": "6068efe540975e2e9ce9534b",
  "title": "test",
  "description": "slightly worn but in good condition",
  "price": 77,
  "date": "2021-04-03T22:44:53.980Z",
  "__v": 0
}
```
>Date also updated

### DELETE Ad

This method takes: id of Ad title as a query param and delete ad returns delete id of ad in JSON format

#### Arguments:

| Query parameter |   type   | description       | require | validation                         |
| --------------- | :------: | ----------------- | :-----: | :--------------------------------- |
| **id**          | `string` | uniq param for ad | `true`  | /^[0-9a-fA-F]{24}$/ (typeObjectId) |

#### Errors:

| Parameter         |   type   |            values             |
| ----------------- | :------: | :---------------------------: |
| **ERROR_MESSAGE** | `string` | "Ad Not Found" ,<br/>"bad ID" |

#### Example:
#### DELETE `http://localhost:3000/api/ad/6068efe540975e2e9ce9534b`

Returns deleted id of ad and response status code 200.

```json
{
  "id": "6068efe540975e2e9ce9534b"
}
```
