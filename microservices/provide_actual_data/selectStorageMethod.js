const redisClient = require('./redis/client')
const moment = require('moment')
const getDataFromDB = require('./dataSourseProviders/getDataFromDB')
const getDataFromRedis = require('./dataSourseProviders/getDataFromRedis')

const selectStorageMethod = () => {
    return new Promise((resolve,reject)=>{
        redisClient.get('DATA:timestamp',(err,value)=>{
            if (moment().diff(value, 'minutes')>3) resolve(getDataFromDB)
            if (moment().diff(value, 'minutes')<=3) resolve(getDataFromRedis)
          })
    })

}

module.exports = selectStorageMethod
