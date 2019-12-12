const endpointsRouter = require('express').Router();
const getEndpoints = require('../controllers/c-endpoints')

endpointsRouter.get('/', getEndpoints)

module.exports = endpointsRouter;