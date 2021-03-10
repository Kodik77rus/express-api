const express = require('express')
const mongoose = require('mongoose')
const URL =  require('./utils')

const PORT = process.env.PORT || 3000

const app = express()

async function start() {
  try {
    await mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
