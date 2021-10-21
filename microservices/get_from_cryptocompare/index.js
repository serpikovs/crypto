const Queue = require('bull')
const express = require('express')
const cryptocompareLogger = require('./cryptocompareLogger')

const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => {
    cryptocompareLogger.start()
    console.log(`Server started ${PORT}`)
  })

