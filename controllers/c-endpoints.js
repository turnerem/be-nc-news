const fetchEndpoints = require('../models/m-endpoints')

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints()
    .then(endpoints => {
      res.status(200).send({ endpoints })
    })
}