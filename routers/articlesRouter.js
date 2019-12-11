const articlesRouter = require('express').Router();
const { getArticle, patchArticle } = require('../controllers/c-articles')

articlesRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)

module.exports = articlesRouter;