const redisClient = require('../redis/client')
const getRAW = require('../database/getRAW')
const getDISPLAY = require('../database/getDISPLAY')

const getDataFromDB = async (cryptoArr, fiatArr) => {
  const RAWarr = await getRAW(cryptoArr, fiatArr)
  const RAW = {}
  
  RAWarr.map((pair) => {
    if (RAW[pair.CRYPTO_NAME]===undefined) RAW[pair.CRYPTO_NAME]= {}
    if (RAW[pair.CRYPTO_NAME]?.[pair.FIAT_NAME]===undefined)   

    RAW[pair.CRYPTO_NAME][pair.FIAT_NAME] = {
      CHANGE24HOUR: pair.CHANGE24HOUR,
      CHANGEPCT24HOUR: pair.CHANGEPCT24HOUR,
      OPEN24HOUR: pair.OPEN24HOUR,
      VOLUME24HOUR: pair.VOLUME24HOUR,
      VOLUME24HOURTO: pair.VOLUME24HOURTO,
      LOW24HOUR: pair.LOW24HOUR,
      HIGH24HOUR: pair.HIGH24HOUR,
      PRICE: pair.PRICE,
      LASTUPDATE: pair.LASTUPDATE,
      SUPPLY: pair.SUPPLY,
      MKTCAP: pair.MKTCAP
    }
  })

  const DISPLAYarr = await getDISPLAY(cryptoArr, fiatArr)
  const DISPLAY = {}

  DISPLAYarr.map((pair) => {
    if (DISPLAY[pair.CRYPTO_NAME]===undefined) DISPLAY[pair.CRYPTO_NAME]= {}
    if (DISPLAY[pair.CRYPTO_NAME]?.[pair.FIAT_NAME]===undefined) 

    DISPLAY[pair.CRYPTO_NAME][pair.FIAT_NAME] = {
      CHANGE24HOUR: pair.CHANGE24HOUR,
      CHANGEPCT24HOUR: pair.CHANGEPCT24HOUR,
      OPEN24HOUR: pair.OPEN24HOUR,
      VOLUME24HOUR: pair.VOLUME24HOUR,
      VOLUME24HOURTO: pair.VOLUME24HOURTO,
      LOW24HOUR: pair.LOW24HOUR,
      HIGH24HOUR: pair.HIGH24HOUR,
      PRICE: pair.PRICE,
      LASTUPDATE: pair.LASTUPDATE,
      SUPPLY: pair.SUPPLY,
      MKTCAP: pair.MKTCAP
    }
  })

  return { RAW,DISPLAY }
}

module.exports = getDataFromDB
