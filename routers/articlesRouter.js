const articlesRouter = require('express').Router();
const { getArticles, getArticle, patchArticle, postComment, getComments } = require('../controllers/c-articles')

articlesRouter.route('/')
  .get(getArticles)

articlesRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)

articlesRouter.route('/:article_id/comments')
  .post(postComment)
  .get(getComments)

module.exports = articlesRouter;