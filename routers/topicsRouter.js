const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/c-topics')
const { send405Error } = require('../errorHandling')

topicsRouter.route('/')
  .get(getTopics)
  .all((req, res, next) => send405Error(req, res, next))

module.exports = topicsRouter;