const articlesRouter = require('express').Router();
const { getArticles, getArticle, patchArticle, postComment, getComments } = require('../controllers/c-articles')
const { send405Error } = require('../errorHandling')

articlesRouter.route('/')
  .get(getArticles)
  .all((req, res, next) => send405Error(req, res, next))

articlesRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .all((req, res, next) => send405Error(req, res, next))

articlesRouter.route('/:article_id/comments')
  .post(postComment)
  .get(getComments)
  .all((req, res, next) => send405Error(req, res, next))
  

module.exports = articlesRouter;