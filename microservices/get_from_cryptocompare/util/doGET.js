const https = require('https')

const doGET = async (URL, params = {}) => {
  let strParams = new URLSearchParams(params)
  strParams = strParams.toString().length ? '?' + strParams : ''

  const options = {
    port: 443,
    method: 'GET',
  }

  return new Promise((resolve, reject) => {
    const req = https.request(URL + strParams, options, (res) => {
      let data = ''
      res.on('data', (chunk) => (data = data + chunk.toString()))
      res.on('end', () => resolve(JSON.parse(data)))
    })
    req.end()
  })
}

module.exports = doGET
