# firstApi

This service for storing and submitting ads.

## Overview 

This is my implementation of this [task](https://github.com/avito-tech/adv-backend-trainee-assignment/blob/main/README.md).
The API is organized around REST. API has predictable resource-oriented URLs, all endpoints are validated and returns JSON-responses, uses standard HTTP response codes.

## About stack:

### This project based on:

-   MongoDB
-   NodeJS

### npm modules used:
-   Axios
-   ExpressJS
-   Jest
-   Mongoose
-   Nodemon

## API Methods
### POST ad

Create an ad

#### Arguments:

| Paraments       |       type       | description       | validation                                                                    | require |
| --------------- | :--------------: | ----------------- | ----------------------------------------------------------------------------- | :-----: |
| **title**       |      string      | name of  ad       | max length 200 symbols                                                        |  true   |
| **description** |      string      | description of ad | max length 1000 symbols                                                       |  true   |
| **price**       |      number      | price of ad       | price > 0                                                                     |  true   |
| **imgURLs**     | Array of strings | image of ad       | min 1 link, max 3 links, each of image <br /> must contains http/https method |  true   |

#### _Examples_:

POST `api/ad`

```json
{
  "title":"crutches",
  "description":"slightly worn but in good condition",
  "price":"77",
  "imgURLs": ["https://mainImg","https://secondImg","https://thirdImg"]
}
```

returns response satus code 201, and a json object which contains an id of created ad

```json
{
  "id": "6057aa5592b1fc1f986261b1"
}
```

### GET api/ad

Returns ad

### Arguments:

| Paraments                        |  type  | description                            | require |
| -------------------------------- | :----: | -------------------------------------- | :-----: |
| Required parameter               |
| **id**                           | string | uniq param for ad                      |  true   |
| Additional fields parameters     |
| **fields="description"**         | string | description of ad                      |  false  |
| **fields="imgURLs"**             | string | all image of ad                        |  false  |
| **fields="imgURLs,description"** | string | all image of ad <br /> and description |  false  |

#### _Examples_:

GET `api/ad/604a990f7c6dba`

returns response satus code 200, and a json object which contains an title, price, and main img url of ad

```json
{
  "title": "crutches",
  "price": 78,
  "mainUrl": "https://mainImg"
}
```

GET `api/ad/604a990f7c6dba?fields=imgURLs`

returns response satus code 200, and a json object which contains an title, price, and all imgs url of ad

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

GET `api/ad/604a990f7c6dba?fields=description`

returns response satus code 200, and a json object which contains an title, price, and description of ad

```json
{
  "title": "crutches",
  "description": "slightly worn but in good condition",
  "price": 78
}
```

GET `api/ad/604a990f7c6dba?fields=imgURLs,description`

returns

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

### GET ads
### Arguments:
#### _Examples_:

