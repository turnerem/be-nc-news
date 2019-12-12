const endpointsRouter = require('express').Router();
const { getEndpoints } = require('../controllers/c-endpoints')

endpointsRouter.route('/')
  .get(getEndpoints)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })

module.exports = endpointsRouter;