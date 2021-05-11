const express = require('express')
const mongoose = require('mongoose')

const adRouter = require('./routes/ad')
const authRouter = require('./routes/auth')
const { notFoundError } = require('./utils/index')
const { URL_FOR_CONNECT_TO_DB } = require('./constants')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/api', adRouter)
app.use(notFoundError)

const start = async () => {
  try {
    await mongoose.connect(
      URL_FOR_CONNECT_TO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
    )
    app.listen(PORT, async () => {
      console.log(`App listening at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

module.exports = app
