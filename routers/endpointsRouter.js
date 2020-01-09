const endpointsRouter = require('express').Router();
const { getEndpoints } = require('../controllers/c-endpoints')
const { send405Error } = require('../errorHandling');

endpointsRouter.route('/')
  .get(getEndpoints)
  .all(send405Error)


module.exports = endpointsRouter;