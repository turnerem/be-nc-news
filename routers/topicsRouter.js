const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/c-topics')
const { send405Error } = require('../errorHandling')

topicsRouter.route('/')
  .get(getTopics)
  .all(send405Error)

module.exports = topicsRouter;