const Queue = require('bull')
const moment = require('moment')
const getInfoProcess = require('./processes/getData.process')

const cryptoCurrencies = ['BTC', 'XRP', 'ETH', 'BCH', 'EOS', 'LTC', 'XMR', 'DASH']
const fiatCurrencies = ['USD', 'JPY', 'EUR', 'GBP', 'RUR']

const mainQueue = new Queue('mainQueue', process.env.REDIS_URL) //perform once per 24

const cryptocompareLogger = {
  start: () => {
    const jobName = `mainJob`
    mainQueue.process(jobName, getInfoProcess)
    mainQueue.add(jobName, {  cryptoCurrencies,  fiatCurrencies }, { repeat: { cron: '* * * * *' } })
  },
}

module.exports = cryptocompareLogger
