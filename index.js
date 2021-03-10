const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
