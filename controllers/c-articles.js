const { fetchArticle } = require('../models/m-articles')

exports.getArticle = (req, res, next) => {
  fetchArticle(req.params.article_id)
    .then(article => {
      res.status(200).send({ article })
    })
    .catch(err => next(err))
}