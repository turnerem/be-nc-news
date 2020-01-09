const articlesRouter = require('express').Router();
const { getArticles, getArticle, patchArticle, postComment, getComments } = require('../controllers/c-articles')
const { send405Error } = require('../errorHandling')

articlesRouter.route('/')
  .get(getArticles)
  .all(send405Error)

articlesRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .all(send405Error)

articlesRouter.route('/:article_id/comments')
  .post(postComment)
  .get(getComments)
  .all(send405Error)
  

module.exports = articlesRouter;