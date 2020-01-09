const endpointsRouter = require('express').Router();
const { getEndpoints } = require('../controllers/c-endpoints')
const { send405Error } = require('../errorHandling');

endpointsRouter.route('/')
  .get(getEndpoints)
  .all((req, res, next) => send405Error(req, res, next))


module.exports = endpointsRouter;