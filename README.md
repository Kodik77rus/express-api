# firstApi

This service for storing and submitting ads.

## Overview 

This is my implementation of this [task](https://github.com/avito-tech/adv-backend-trainee-assignment/blob/main/README.md).
The API is organized around REST. API has predictable resource-oriented URLs, all endpoints are validated and returns JSON-responses, uses standard HTTP response codes.

## About stack:

### This project based on:

-   MongoDB
-   NodeJS

### NPM modules used:
-   Axios
-   ExpressJS
-   Jest
-   Mongoose
-   Nodemon

### MongoDB schema:

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

## API Methods

### POST ad

This method takes: title, description, links images, price, and returns the ID of the created ad and \
response status code.

#### Arguments:

| Paraments       |       type       | description       | validation                                                                    | require |
| --------------- | :--------------: | ----------------- | ----------------------------------------------------------------------------- | :-----: |
| **title**       |      string      | name of  ad       | max length 200 symbols                                                        |  true   |
| **description** |      string      | description of ad | max length 1000 symbols                                                       |  true   |
| **price**       |      number      | price of ad       | price > 0                                                                     |  true   |
| **imgURLs**     | Array of strings | image of ad       | min 1 link, max 3 links, each of image <br /> must contains http/https method |  true   |

 >Automatically creates an id and date in ISO 8601 format
 
#### _Example_:

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

### GET ad

This method takes the ad ID as a required parametr and returns: ad name, price, link to the main photo.\
Optional fields (you can request them by passing the fields parameter): description, links to all photos

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

1. GET `api/ad/604a990f7c6dba`

returns response satus code 200, and a json object which contains a title, price, and main image url of ad

```json
{
  "title": "crutches",
  "price": 78,
  "mainUrl": "https://mainImg"
}
```

2. GET `api/ad/604a990f7c6dba?fields=imgURLs`

returns response satus code 200, and a json object which contains a title, price, and all images urls of ad

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

3. GET `api/ad/604a990f7c6dba?fields=description`

returns response satus code 200, and a json object which contains a title, price and description of ad

```json
{
  "title": "crutches",
  "description": "slightly worn but in good condition",
  "price": 78
}
```

4. GET `api/ad/604a990f7c6dba?fields=imgURLs,description`

>position of the attributes passed in the `fields` is not important

returns response satus code 200, and a json object which contains a title, price, description and all images urls of ad

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

