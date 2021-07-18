require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const adRouter = require('./routes/ad')
const authRouter = require('./routes/auth')
const { notFoundError } = require('./utils/index')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/api', adRouter)
app.use(notFoundError)

const start = async () => {
  try {
    await mongoose.connect(
      process.env.DB_HOST,
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
