const articlesRouter = require('express').Router();
const { getArticle } = require('../controllers/c-articles')

articlesRouter.get('/:article_id', getArticle)

module.exports = articlesRouter;