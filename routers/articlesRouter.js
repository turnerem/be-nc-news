const articlesRouter = require('express').Router();
const { getArticles, getArticle, patchArticle, postComment, getComments } = require('../controllers/c-articles')
// const { methNotFound } = require('../errorHandling')

articlesRouter.route('/')
  .get(getArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })

articlesRouter.route('/:article_id')
  .get(getArticle)
  .patch(patchArticle)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })

articlesRouter.route('/:article_id/comments')
  .post(postComment)
  .get(getComments)
 .all((req, res, next) => {
    res.status(405).send({ msg: 'Method Not Found'})
  })
  

module.exports = articlesRouter;