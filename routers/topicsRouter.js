const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/c-topics')

topicsRouter.get('/', getTopics);

module.exports = topicsRouter;