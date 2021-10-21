const redisClient = require('../redis/client')

const getDataFromRedis = async (cryptoArr, fiatArr) => {
  const RAW = {}

  for (let i = 0; i < cryptoArr.length; i++) {
    RAW[cryptoArr[i]] = {}
    for (let j = 0; j < fiatArr.length; j++) {
      RAW[cryptoArr[i]][fiatArr[j]] = {}

      RAW[cryptoArr[i]][fiatArr[j]].CHANGE24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:CHANGE24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].CHANGEPCT24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:CHANGEPCT24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].OPEN24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:OPEN24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].VOLUME24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:VOLUME24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].VOLUME24HOURTO = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:VOLUME24HOURTO`)
      RAW[cryptoArr[i]][fiatArr[j]].LOW24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:LOW24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].HIGH24HOUR = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:HIGH24HOUR`)
      RAW[cryptoArr[i]][fiatArr[j]].PRICE = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:PRICE`)
      RAW[cryptoArr[i]][fiatArr[j]].LASTUPDATE = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:LASTUPDATE`)
      RAW[cryptoArr[i]][fiatArr[j]].SUPPLY = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:SUPPLY`)
      RAW[cryptoArr[i]][fiatArr[j]].MKTCAP = await buildPromise(`DATA:RAW:${cryptoArr[i]}:${fiatArr[j]}:MKTCAP`)
    }
  }

  const DISPLAY = {}

  for (let i = 0; i < cryptoArr.length; i++) {
    DISPLAY[cryptoArr[i]] = {}
    for (let j = 0; j < fiatArr.length; j++) {
      DISPLAY[cryptoArr[i]][fiatArr[j]] = {}

      DISPLAY[cryptoArr[i]][fiatArr[j]].CHANGE24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:CHANGE24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].CHANGEPCT24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:CHANGEPCT24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].OPEN24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:OPEN24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].VOLUME24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:VOLUME24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].VOLUME24HOURTO = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:VOLUME24HOURTO`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].LOW24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:LOW24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].HIGH24HOUR = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:HIGH24HOUR`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].PRICE = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:PRICE`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].LASTUPDATE = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:LASTUPDATE`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].SUPPLY = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:SUPPLY`)
      DISPLAY[cryptoArr[i]][fiatArr[j]].MKTCAP = await buildPromise(`DATA:DISPLAY:${cryptoArr[i]}:${fiatArr[j]}:MKTCAP`)
    }
  }

  return { RAW, DISPLAY }
}

const buildPromise = (redisKey) => {
  return new Promise((resolve, reject) => {
    redisClient.get(redisKey, (err, value) => {
      console.log(value)
      resolve(value)
    })
  })
}

module.exports = getDataFromRedis
