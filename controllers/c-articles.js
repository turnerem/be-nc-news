const { fetchMaybeUpdateArticle, addComment } = require('../models/m-articles')

exports.getArticle = (req, res, next) => {
  fetchMaybeUpdateArticle(req.params.article_id)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}

exports.patchArticle = (req, res, next) => {
  console.log(req.body, 'THE REQUEST')
  fetchMaybeUpdateArticle(req.params.article_id, req.body.inc_votes)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}

// exports.postComment = (req, res, next) => {
//   addComment()
// }