const saveRAW = require('../database/saveRAW')
const saveDISPLAY = require('../database/saveDISPLAY')
const doGET = require('../util/doGET')
const moment = require('moment')
const redisClient = require('../redis/client')

const getInfoProcess = async (job) => {
  const cryptoCurrenciesArr = job.data.cryptoCurrencies
  const cryptoCurrenciesStr = job.data.cryptoCurrencies.join(',')
  const fiatCurrenciesArr = job.data.fiatCurrencies
  const fiatCurrenciesStr = job.data.fiatCurrencies.join(',')

  const response = await doGET('https://min-api.cryptocompare.com/data/pricemultifull', {
    fsyms: cryptoCurrenciesStr,
    tsyms: fiatCurrenciesStr,
    api_key: '6d638b366766f7407e127a8df7b4639f3968da5ca57dd4354d5be74cd5612305',
  })

  if (response?.Response === 'Error') return null

  const RAW = response.RAW
  const DISPLAY = response.DISPLAY

  cryptoCurrenciesArr.forEach((cryptoCurrency) => {
    fiatCurrenciesArr.forEach((fiatCurrency) => {
      const timestamp = moment(Date.now()).local().format('YYYY-MM-DD HH:mm:ss').toString()

      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:CHANGE24HOUR`, RAW[cryptoCurrency][fiatCurrency].CHANGE24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:CHANGEPCT24HOUR`, RAW[cryptoCurrency][fiatCurrency].CHANGEPCT24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:OPEN24HOUR`, RAW[cryptoCurrency][fiatCurrency].OPEN24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:VOLUME24HOUR`, RAW[cryptoCurrency][fiatCurrency].VOLUME24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:VOLUME24HOURTO`, RAW[cryptoCurrency][fiatCurrency].VOLUME24HOURTO)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:LOW24HOUR`, RAW[cryptoCurrency][fiatCurrency].LOW24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:HIGH24HOUR`, RAW[cryptoCurrency][fiatCurrency].HIGH24HOUR)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:PRICE`, RAW[cryptoCurrency][fiatCurrency].PRICE)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:LASTUPDATE`, RAW[cryptoCurrency][fiatCurrency].LASTUPDATE)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:SUPPLY`, RAW[cryptoCurrency][fiatCurrency].SUPPLY)
      redisClient.set(`DATA:RAW:${cryptoCurrency}:${fiatCurrency}:MKTCAP`, RAW[cryptoCurrency][fiatCurrency].MKTCAP)
      
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:CHANGE24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].CHANGE24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:CHANGEPCT24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].CHANGEPCT24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:OPEN24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].OPEN24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:VOLUME24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].VOLUME24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:VOLUME24HOURTO`, DISPLAY[cryptoCurrency][fiatCurrency].VOLUME24HOURTO)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:LOW24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].LOW24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:HIGH24HOUR`, DISPLAY[cryptoCurrency][fiatCurrency].HIGH24HOUR)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:PRICE`, DISPLAY[cryptoCurrency][fiatCurrency].PRICE)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:LASTUPDATE`, DISPLAY[cryptoCurrency][fiatCurrency].LASTUPDATE)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:SUPPLY`, DISPLAY[cryptoCurrency][fiatCurrency].SUPPLY)
      redisClient.set(`DATA:DISPLAY:${cryptoCurrency}:${fiatCurrency}:MKTCAP`, DISPLAY[cryptoCurrency][fiatCurrency].MKTCAP)
      redisClient.set(`DATA:timestamp`, timestamp)

      saveRAW({
        CRYPTO_NAME: cryptoCurrency,
        FIAT_NAME: fiatCurrency,
        CHANGE24HOUR: RAW[cryptoCurrency][fiatCurrency].CHANGE24HOUR,
        CHANGEPCT24HOUR: RAW[cryptoCurrency][fiatCurrency].CHANGEPCT24HOUR,
        OPEN24HOUR: RAW[cryptoCurrency][fiatCurrency].OPEN24HOUR,
        VOLUME24HOUR: RAW[cryptoCurrency][fiatCurrency].VOLUME24HOUR,
        VOLUME24HOURTO: RAW[cryptoCurrency][fiatCurrency].VOLUME24HOURTO,
        LOW24HOUR: RAW[cryptoCurrency][fiatCurrency].LOW24HOUR,
        HIGH24HOUR: RAW[cryptoCurrency][fiatCurrency].HIGH24HOUR,
        PRICE: RAW[cryptoCurrency][fiatCurrency].PRICE,
        LASTUPDATE: RAW[cryptoCurrency][fiatCurrency].LASTUPDATE,
        SUPPLY: RAW[cryptoCurrency][fiatCurrency].SUPPLY,
        MKTCAP: RAW[cryptoCurrency][fiatCurrency].MKTCAP,
        TIMESTAMP: timestamp,
      })


      saveDISPLAY({
        CRYPTO_NAME: cryptoCurrency,
        FIAT_NAME: fiatCurrency,
        CHANGE24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].CHANGE24HOUR,
        CHANGEPCT24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].CHANGEPCT24HOUR,
        OPEN24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].OPEN24HOUR,
        VOLUME24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].VOLUME24HOUR,
        VOLUME24HOURTO: DISPLAY[cryptoCurrency][fiatCurrency].VOLUME24HOURTO,
        LOW24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].LOW24HOUR,
        HIGH24HOUR: DISPLAY[cryptoCurrency][fiatCurrency].HIGH24HOUR,
        PRICE: DISPLAY[cryptoCurrency][fiatCurrency].PRICE,
        LASTUPDATE: DISPLAY[cryptoCurrency][fiatCurrency].LASTUPDATE,
        SUPPLY: DISPLAY[cryptoCurrency][fiatCurrency].SUPPLY,
        MKTCAP: DISPLAY[cryptoCurrency][fiatCurrency].MKTCAP,
        TIMESTAMP: timestamp,
      })
    })
  })
}

module.exports = getInfoProcess
