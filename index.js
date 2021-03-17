const express = require('express')
const mongoose = require('mongoose')
const adRouter = require('./routes/ad')
const URL =  require('./utils')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/api', adRouter)

async function start() {
  try {
    await mongoose.connect(
      URL.URL_FOR_CONNECT_TO_DB,
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
