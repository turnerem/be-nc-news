const fs = require('fs')

exports.fetchEndpoints = () => {
  console.log('reached endpoints model')
  fs.readFile(_dirname + '/../endpoints.json', (err, endpoints) => {
    if (err) next(err)
    
  })

}