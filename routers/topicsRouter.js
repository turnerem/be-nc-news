const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/c-topics')
// const { methNotFound } = require('../errorHandling')

topicsRouter.route('/')
  .get(getTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })

module.exports = topicsRouter;