const MicroMQ = require('micromq')
//const getData = require('./getData')
const selectStorageMethod = require('./selectStorageMethod')

const app = new MicroMQ({
  name: 'provideActualData',
  rabbit: {
    url: process.env.RABBIT_URL,
  },
})

app.get('/getActual', async (req, res) => {
  const cryptoArr = req.query.fsyms.split(',')
  const fiatArr = req.query.tsyms.split(',')

  const storageMethod = await selectStorageMethod()

  const result = await storageMethod(cryptoArr, fiatArr)

  res.json(result)
})

app.start()
