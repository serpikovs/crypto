const connection = require('./sequelizeConnector')
const { QueryTypes } = require('sequelize')

const getRAW = async (cryptoArr, fiatArr) => {
  const results = await connection.query(
    `SELECT 
      CRYPTO_NAME,
      FIAT_NAME,
      CHANGE24HOUR,
      CHANGEPCT24HOUR,
      OPEN24HOUR,
      VOLUME24HOUR,
      VOLUME24HOURTO,
      LOW24HOUR,
      HIGH24HOUR,
      PRICE,
      LASTUPDATE,
      SUPPLY,
      MKTCAP
    FROM crypto.RAW
    WHERE 
        CRYPTO_NAME IN (:cryptoArr) AND 
        FIAT_NAME IN (:fiatArr) AND
        TIMESTAMP = (SELECT TIMESTAMP FROM crypto.RAW ORDER BY TIMESTAMP DESC LIMIT 1)
    ORDER BY TIMESTAMP DESC`,
    {
      replacements: {
        cryptoArr: cryptoArr,
        fiatArr: fiatArr,
      },
      type: QueryTypes.SELECT,
      logging: false,
      //logging: (sql, queryObject) => console.log(sql, queryObject.bind),
    }
  )
  return results
}

module.exports = getRAW
