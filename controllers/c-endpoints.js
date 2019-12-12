const { fetchEndpoints } = require('../models/m-endpoints')

exports.getEndpoints = (req, res, next) => {
  console.log('reached controller')
  fetchEndpoints()
    .then(endpoints => {
      res.status(200).send({ endpoints })
    })
}