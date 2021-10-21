const connection = require('./sequelizeConnector')
const { QueryTypes } = require('sequelize');

const saveDISPLAY = async (snapshot) => {
  const result = await connection.query(
    `INSERT INTO 
        DISPLAY 
      SET 
        CRYPTO_NAME=:CRYPTO_NAME,
        FIAT_NAME=:FIAT_NAME,
        CHANGE24HOUR=:CHANGE24HOUR,
        CHANGEPCT24HOUR=:CHANGEPCT24HOUR,
        OPEN24HOUR=:OPEN24HOUR,
        VOLUME24HOUR=:VOLUME24HOUR,
        VOLUME24HOURTO=:VOLUME24HOURTO,
        LOW24HOUR=:LOW24HOUR,
        HIGH24HOUR=:HIGH24HOUR, 
        PRICE=:PRICE,
        LASTUPDATE=:LASTUPDATE,
        SUPPLY=:SUPPLY,
        MKTCAP=:MKTCAP,       
        TIMESTAMP=:TIMESTAMP`,
    {
      replacements: {
        CRYPTO_NAME: snapshot.CRYPTO_NAME,
        FIAT_NAME: snapshot.FIAT_NAME,
        CHANGE24HOUR: snapshot.CHANGE24HOUR,
        CHANGEPCT24HOUR: snapshot.CHANGEPCT24HOUR,
        OPEN24HOUR:snapshot.OPEN24HOUR,
        VOLUME24HOUR:snapshot.VOLUME24HOUR,
        VOLUME24HOURTO:snapshot.VOLUME24HOURTO,
        LOW24HOUR:snapshot.LOW24HOUR,
        HIGH24HOUR:snapshot.HIGH24HOUR,
        PRICE: snapshot.PRICE,
        LASTUPDATE: snapshot.LASTUPDATE,
        SUPPLY: snapshot.SUPPLY,
        MKTCAP: snapshot.MKTCAP,
        TIMESTAMP: snapshot.TIMESTAMP
      },
      type: QueryTypes.INSERT,
      logging: false,
      //logging: (sql, queryObject) => console.log(sql, queryObject.bind),
    }
  )
  return result
}

module.exports = saveDISPLAY
